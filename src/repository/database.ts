import {createPool} from "mysql2/promise"

require("dotenv").config();

//Database connection. Requires changing username and password according to your own account
export async function connection(){
    const connection = await createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        connectionLimit: 10
    });
    return connection;
}