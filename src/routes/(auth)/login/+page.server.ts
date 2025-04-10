import { hash, verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';
import { v4 as uuidv4 } from 'uuid';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/overview');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username')?.toString();
		const password = formData.get('password')?.toString();
		const dbConn = event.locals.dbConn;

		if (!validateUsername(username)) {
			return fail(400, {
				message: 'Invalid username (min 3, max 31 characters, alphanumeric only)'
			});
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}
		
		const results = await dbConn.query('SELECT * FROM global_user WHERE username = $1::text', [username]);

		const existingUser = results.rows[0];
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username' });
		}
		
		const validPassword = await verify(existingUser.password_hash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(event.locals.dbConn, sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/overview');
	},
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username')?.toString();
		const password = formData.get('password')?.toString();
		const dbConn = event.locals.dbConn;

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await dbConn.query(`INSERT INTO global_user (id, username, password_hash) VALUES ($1, $2, $3)`, [userId, username, passwordHash]);

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(dbConn, sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			dbConn.release();
		} catch (e) {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/overview');
	}
};

function generateUserId() {
	return uuidv4();
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
