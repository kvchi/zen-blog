// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// const dbPath =path.resolve(__dirname, 'database.db');
// const db = new sqlite3.Database(dbPath);


// db.serialize(() => {
    
// })
const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nathanblog_database"
})

db.connect((err) => {
    if(err) throw new Error('Unable to connect to database')
    else{
        const adminTable = db.query(`CREATE TABLE IF NOT EXISTS admin (
            id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`) 
    }
})

module.exports = db;