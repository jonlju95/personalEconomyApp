export type User = {
	id: string;
	firstName: string;
	lastName: string;
	birthdate: Date;
	phone: string;
	email: string;
	username: string;
	memberSince: Date;
};

export type Category = {
	id: string;
	type: string;
};

export type Session = {
	id: string;
	userId: string;
	expiresAt: Date;
};

export type Expense = {
	id: string;
	title: string;
	description: string;
	date: Date;
	recurring: boolean;
	amount: number;
	categoryId: string;
	userId: string;
};

export type Budget = {
	id: string;
	title: string;
	startDate: Date;
	endDate: Date;
	amount: number;
	limit: number;
	userId: string;
};
