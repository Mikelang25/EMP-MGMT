require('dotenv').config(); // this line is important!

module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": "127.0.0.1",
        "dialect": "mysql",
        "migrationStorageTableName": "sequelize_meta",
        "accessKeyId": process.env.AWSAccessKeyId,
        "secretAccessKey": process.env.AWSSecretKey,
        "region": "us-east-2" 
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "testdb",
        "host": "localhost",
        "dialect": "mysql",
        "logging": false
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql"
    }
}