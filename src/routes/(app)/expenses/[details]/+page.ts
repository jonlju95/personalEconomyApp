import type { Expense } from '$lib/types';
import type { Actions } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const response = await event.fetch('/api/expenses/[details]', {
		method: 'GET',
		headers: { id: event.params.details, 'Content-Type': 'application/json' }
	});

	const res = await response.json();
	const expense: Expense = { ...res.expense };

	return { expense };
};

export const actions: Actions = {
	save: async (event) => {
		return event;
	}
}