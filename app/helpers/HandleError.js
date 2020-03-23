'use strict';

module.exports = (prop) => {

    if (!prop.errors) {

        return [prop];
    }

    let errors = [];

    prop.errors.forEach((error) => {
        
        let message;

        switch (error.validatorKey) {
            
            case 'isEmail':
                
                message = 'O e-mail informado é inválido';
                break;
            
            case 'notEmpty':

                message = 'O campo não pode estar vázio'
                break;

            case 'not_unique':
                
                message = 'O valor informado já exite na base de dados';
                break;
        }

        errors.push({
            field   : error.path,
            value   : error.value,
            message : message
        });
    });

    return errors;
}