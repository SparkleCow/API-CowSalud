import {Pool,createPool} from "mysql2/promise"

export async function connection(){
    const connection = await createPool({
        host: "localhost",
        user: "root",
        password: "Borman15",
        database: "cow_salud",
        connectionLimit: 10
    });
    return connection;
}