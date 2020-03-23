'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');

const root      = path.dirname(require.main.filename);
const config    = require(`${root}/config/database.js`);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const files     = `${root}/app/models`;
const db        = {};

fs.readdirSync(files).forEach(file => {

    if (path.extname(file) === '.js') {

        const model = sequelize['import'](path.join(files, file));

        db[model.name] = model;
    }
});

Object.keys(db).forEach(modelName => {
    
    if (db[modelName].associate) {
        
        db[modelName].associate(db);
    }
});

db.sequelize    = sequelize;
db.Sequelize    = Sequelize;

module.exports  = db;