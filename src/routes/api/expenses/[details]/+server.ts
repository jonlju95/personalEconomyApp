import type { Expense } from '$lib/types';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, locals }) => {
	const { headers } = request;
	const { dbConn, user } = locals;

	let expense: Expense = {};

	const result = await dbConn.query(
		`SELECT id, title, description, date, recurring, amount, categoryid, userid FROM expense WHERE id = $1 AND userid = $2`,
		[headers.get('id'), user.id]
	);

	if (result.rows[0]) {
		expense = { ...result.rows[0] };
	}

	return new Response(JSON.stringify({ expense }), { status: 200 });
};
