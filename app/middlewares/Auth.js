'use strict';

const HandleResponse    = require('@helpers/HandleResponse');
const { decryptJwt }    = require('@helpers/Auth');

module.exports = (req, res, next) => {

    const token     = req.headers['x-access-token'];

    if (!token) {

        return res.status(401).json(HandleResponse({
            errors : {
                message : 'Token de acesso não informado'
            }
        }));
    }

    const decoded = decryptJwt(token);

    if (!decoded) {
        
        return res.status(500).json(HandleResponse({
            errors : {
                message : 'Token de acesso inválido'
            }
        }));
    }

    req.user_id = decoded.user_id;
        
    next();
};