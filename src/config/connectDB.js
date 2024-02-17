const { Sequelize } = require('sequelize');
require('dotenv').config()

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DATABASE_NAME,
    DB_DIALECT,
    NODE_ENV
} = process.env;

// const sequelize = new Sequelize(
//     process.env.DB_DATABASE_NAME,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD, 
//     {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: process.env.DB_DIALECT,
//         dialectOptions: 
//         process.env.DB_SSL === 'true' 
//         ? 
//         {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         }
//         :
//         {},
//         query: {
//             "raw": true
//         },
//         timezone: "+07:00"
//     }
// );

let sequelize;
sequelize = NODE_ENV === "production"
    ? new Sequelize(
        {
            dialect: DB_DIALECT,
            host: DB_HOST,
            port: DB_PORT,
            database: DB_DATABASE_NAME,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                },
                keepAlive: true,
            },
            ssl: true,
        }
    )
    : new Sequelize(
        `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE_NAME}`,
        { logging: false, native: false }
    );

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connection