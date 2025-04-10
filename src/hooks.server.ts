import type { Handle } from '@sveltejs/kit';
import {
	authenticateUser,
	deleteSessionTokenCookie,
	sessionCookieName,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/auth.js';
import { getClient } from '$lib/server/db.js';

export const handle: Handle = async ({ event, resolve }) => {
	const dbConn = await getClient();

	event.locals.dbConn = dbConn;

	event.locals.user = await authenticateUser(event);

	const sessionToken = event.cookies.get(sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	event.locals.session = await validateSessionToken(event, sessionToken);

	if (event.locals.session) {
		setSessionTokenCookie(event, sessionToken, new Date());
	} else {
		deleteSessionTokenCookie(event);
	}

	const response = await resolve(event);
	dbConn.release();

	return response;
};
