const mysql = require("mysql");
const {database} = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{

    if(err)throw err;
    connection.release();
    console.log("Base de datos conectada");
    return;
});

module.exports = pool;