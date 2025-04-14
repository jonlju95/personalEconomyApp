import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import type { Expense } from '$lib/types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	const expenseList = await getExpenseList(event);
	return {
		expenses: expenseList
	};
};

async function getExpenseList(event: RequestEvent): Promise<Expense[]> {
	const dbConn = event.locals.dbConn;
	let expenses: Expense[] = [];

	const result = await dbConn.query(
		`SELECT id, title, description, date, recurring, amount, categoryid, userid FROM expense WHERE userid = $1`,
		[event.locals.user['id']]
	);

	if (result.rows) {
		result.rows.forEach((row) => {			
			expenses.push({ ...row });
		});
	}
	return expenses;
}
