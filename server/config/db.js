const senhaVictor = "root";
const senhaMateus = "r3hcn@R3m1l5";

const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: senhaMateus,
    database: "controle_portaria"
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Mysql conectado!");
    }
});

module.exports = connection;