const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
    "postgres", // process.env.DB_DATABASE_NAME,
    "postgres", // process.env.DB_USERNAME,
    "hai@123VocalAppmnbvcxz", // process.env.DB_PASSWORD, 
    {
        host: "db.kbngeposzxnvbbnceppd.supabase.co", // process.env.DB_HOST,
        port: 5432, // process.env.DB_PORT,
        dialect: "postgres", // process.env.DB_DIALECT,
        dialectOptions: 
        process.env.DB_SSL === 'true' 
        ? 
        {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
        :
        {},
        query: {
            "raw": true
        },
        timezone: "+07:00"
    }
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