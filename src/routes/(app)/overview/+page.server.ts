import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }
    return {};
}

export const actions: Actions = {
    logout: async (event) => {
        const dbConn = event.locals.dbConn;

        await auth.invalidateSession(dbConn, event.locals.session?.id);
        auth.deleteSessionTokenCookie(event);

        return redirect(302, '/login');
    }
}