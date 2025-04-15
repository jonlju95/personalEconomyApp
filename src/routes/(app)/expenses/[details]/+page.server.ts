import type { Category, Expense } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}

	const { details } = params;
	const { dbConn, user } = locals;

	let expense: Expense = {
        id: '',
		title: '',
		description: '',
		date: new Date(),
		amount: 0,
		recurring: false,
		categoryId: '',
		userId: ''
	};
    
	let categories: Category[] = [];

	let result = await dbConn.query(
		`SELECT id, title, description, date, recurring, amount, categoryid, userid FROM expense WHERE id = $1 AND userid = $2`,
		[details, user.id]
	);

	if (result.rows[0]) {
		expense = { ...result.rows[0] };
	}

	result = await dbConn.query(`SELECT id, type FROM global_category`);

	if (result.rows) {
		categories = result.rows;
	}

	return {
		expense,
		categories
	};
};
