import { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } from '$env/static/private';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
	user: PGUSER,
	password: PGPASSWORD,
	host: PGHOST,
	port: Number(PGPORT || 5432),
	database: PGDATABASE
});

export const dbQuery = async (text: string, params: any[]) => {
	const start = Date.now();
	const res = await pool.query(text, params);
	const duration = Date.now() - start;
	console.log('executed query', { text, duration, rows: res.rowCount });
	return res;
};

export const getClient = async () => await pool.connect();

export type SessionValidationResult = Awaited<ReturnType<typeof getClient>>;
