'use strict';

const HandleError = require('@helpers/HandleError');

module.exports = (args) => {

    const { body, errors } = args;

    if (!errors) {

        return {
            body : body
        };
    }

    return {
        errors : HandleError(errors)
    };
}