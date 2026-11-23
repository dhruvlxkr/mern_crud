const mysql = require("mysql2");

const conn = mysql.createConnection({
      user: "root",
      host: "192.168.2.34",
      password: "password",
      database: "merndynamic_crud"
});

conn.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err.message);
        return;
    }

    console.log("Database Connected Successfully");
});


module.exports = conn;