import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DB_URL; 
const pool = new Pool({
    connectionString,
});

console.log("Database connection established");

export default pool;