'use strict';
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const { native } = require('pg');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const { 
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE_NAME,
  DB_DIALECT,
  NODE_ENV
} = process.env;

let sequelize;

// const customizeConfig = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: process.env.DB_DIALECT,
//   dialectOptions:
//     process.env.DB_SSL === 'true'
//       ?
//       {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false
//         }
//       }
//       :
//       {},
//   query: {
//     "raw": true
//   },
//   timezone: "+07:00"
// }


// sequelize = new Sequelize(
//   process.env.DB_DATABASE_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   customizeConfig
// )

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
  {logging: false, native: false}
);

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
