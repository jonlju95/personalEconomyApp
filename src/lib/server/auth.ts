import { type RequestEvent } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import type { PoolClient } from 'pg';
import type { Session, User } from '$lib/types';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	return uuidv4();
}

export async function authenticateUser(event: RequestEvent) {
	const { cookies } = event;
	const dbConn = event.locals.dbConn;

	const userToken = cookies.get('auth-session');

	if (userToken) {
		const sessionResult = await dbConn.query(`SELECT * FROM session WHERE id = $1`, [userToken]);

		if (sessionResult.rows[0]?.user_id) {
			const userResult = await dbConn.query(
				`SELECT id, username, password_hash FROM global_user WHERE id = $1`,
				[sessionResult.rows[0].user_id]
			);
			return {
				id: userResult.rows[0].id,
				username: userResult.rows[0].username,
				passwordHash: userResult.rows[0].password_hash
			};
		}
	}
	dbConn.release();
	return null;
}

export async function createSession(dbConn: PoolClient, sessionId: string, userId: string) {
	const session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await dbConn.query(`INSERT INTO session (id, user_id, expires_at) VALUES ($1, $2, $3)`, [
		sessionId,
		userId,
		new Date(Date.now() + DAY_IN_MS * 30)
	]);
	return session;
}

export async function validateSessionToken(event: RequestEvent, sessionId: string) {
	const { dbConn } = event.locals;
	const result = await dbConn.query(`SELECT id, user_id, expires_at FROM session WHERE id = $1`, [
		sessionId
	]);

	if (!result.rows[0]) {
		return { session: null };
	}

	const session: Session = {
		id: result.rows[0].id,
		userId: result.rows[0].user_id,
		expiresAt: result.rows[0].expires_at
	};

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await dbConn.query(`DELETE FROM session WHERE id = $1`, [session.id]);
		return { session };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await dbConn.query(`UPDATE session SET expires_at = $1 WHERE id = $2`, [
			session.expiresAt,
			session.id
		]);
	}

	return session;
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(dbConn: PoolClient, sessionId: string) {
	await dbConn.query(`DELETE FROM session WHERE id = $1`, [sessionId]);
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token.toString(), {
		maxAge: expiresAt.getTime(),
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
