'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        
        return queryInterface.createTable('users', {

            id : {
                type            : Sequelize.INTEGER,
                primaryKey      : true,
                autoIncrement   : true,
                allowNull       : false,
            },
            name : {
                type        : Sequelize.STRING,
                allowNull   : false
            },
            email : {
                type        : Sequelize.STRING,
                allowNull   : false,
                unique      : true
            },
            password : {
                type        : Sequelize.STRING,
                allowNull   : false
            },
            remember_token : {
                type        : Sequelize.STRING, 
                allowNull   : true
            },
            email_verification : {
                type            : Sequelize.INTEGER, 
                allowNull       : true,
                defaultValue    : 0
            },
            created_at : {
                type        : Sequelize.DATE,
                allowNull   : false
            },
            updated_at: {
                type        : Sequelize.DATE,
                allowNull   : false
            }
        });
    },
    down : (queryInterface, Sequelize) => {

       return queryInterface.dropTable('users');
    }
};
