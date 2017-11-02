
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const pg = require('pg');
const db = require('../config/db');

const sequelize = new Sequelize(db.development.url, {
  logging: false,
});

const models = {
  Sequelize,
  sequelize,
};

fs.readdirSync(__dirname)
  .filter(file => ((file.indexOf('.') !== 0) && (file !== 'index.js') && (path.extname(file) === '.js')))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].init) {
    models[modelName].init(models);
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to postgres db has been established successfully.');
  })
  .catch((err) => {
    console.log('Error connecting to the postgres database: ', err);
    process.exit(1);
  });

module.exports = models;
