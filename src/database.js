const mysql = require('mysql');
const {database} = require('./keys');
const pool = mysql.createPool(database);
const {promisify} = require('util');
pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONECTION WAS CLOSE');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE WAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Promisify pool querys
pool.query = promisify(pool.query);

module.exports = pool;
