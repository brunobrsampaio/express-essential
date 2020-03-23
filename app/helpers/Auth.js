'use strict';

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expire = parseInt(process.env.JWT_EXPIRE || 600);

module.exports = {
    encryptJwt : (options) => {

        if (!secret) {

            throw 'Chave secreta não informada';
        }

        if (typeof options !== 'object') {

            throw 'As opções precisam ser um objeto';
        }

        return jwt.sign(options, secret, {
            // expiresIn : expire
        });
    },
    decryptJwt : (token) => {

        try {

            return jwt.verify(token, secret);
        } catch (err) {

            return false;
        }
    }
}