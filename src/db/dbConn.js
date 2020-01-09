const config = require('../../config/config').get(process.env.NODE_ENV);

const dbConn = {};

dbConn.dbname = config.database.db_name;
dbConn.username = config.database.db_user;
dbConn.password = config.database.db_password;


dbConn.params = {
    dialect: 'mssql',
    host: config.database.db_host,
    port: 1433,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
    // dialectOptions: {

    //     domain: 'EDH'
    // }

}

// module.exports = dbConn;
export default dbConn;