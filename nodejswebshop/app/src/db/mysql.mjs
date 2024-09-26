import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "172.18.0.2",
  user: "root",
  password: "root",
  database: "db_products",
  port: 3306,
});

export default connection;
