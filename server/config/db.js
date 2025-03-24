import { createConnection } from "mysql2";
const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "r3hcn@R3m1l5", // trocar a senha
    database: "controle_portaria"
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Mysql conectado!");
    }
});

export default connection;
