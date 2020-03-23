'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    
    return sequelize.define('Users', {
        name : {
            type        : DataTypes.STRING,
            validate    : {
                notEmpty    : true
            }
        },
        email : {
            type        : DataTypes.STRING,
            validate    : {
                isEmail     : true,
                notEmpty    : true
            }
        },
        password : {
            type        : DataTypes.STRING,
            validate    : {
                notEmpty    : true
            }
        }
    },  {
        createdAt       : 'created_at',
        updatedAt       : 'updated_at'
    }).beforeCreate((options) => {

        options.password = bcrypt.hashSync(options.password, 10);
    }).beforeBulkUpdate((options) => {
        
        options.attributes.password = bcrypt.hashSync(options.attributes.password, 10);
    });
};