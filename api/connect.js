import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect(function (err) {
    if (err) {
      console.error("Error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
    }
  });

  db.on("error", function (err) {
    console.error("DB error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); // Reconnect if connection is lost
    } else {
      throw err;
    }
  });
}

handleDisconnect();

export { db };
