require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": "postgres", // process.env.DB_USERNAME,
    "password": "hai@123VocalAppmnbvcxz", // process.env.DB_PASSWORD,
    "database": "postgres", // process.env.DB_DATABASE_NAME,
    "host": "db.kbngeposzxnvbbnceppd.supabase.co", // process.env.DB_HOST,
    "port": 5432, // process.env.DB_PORT,
    "dialect": "postgres", // process.env.DB_DIALECT,
    dialectOptions:
      process.env.DB_SSL === 'true' ?
        {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        } : {}
    ,
    "timezone": "+07:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};