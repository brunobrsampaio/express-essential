'use strict';

const bcrypt            = require('bcrypt');
const { Users }         = require('@models');
const HandleResponse    = require('@helpers/HandleResponse');
const { encryptJwt }    = require('@helpers/Auth');

module.exports = {
    create : async (req, res) => {

        const { name, email, password } = req.body;

        try {
            
            await Users.create({ name, email, password  });

            return res.status(200).json(HandleResponse({ body : 'ok' }));
        
        } catch(err) {

            return res.status(400).json(HandleResponse({ errors : err }));
        }
    },
    login : async (req, res) => {

        const { email, password } = req.body;

        try {

            await Users.build({ email }).validate();

            const user = await Users.findOne({
                attributes  : [ 'id', 'password' ],
                where       : { email }
            });

            if (!user) {
                
                throw {
                    field   : 'email',
                    value   : email,
                    message : 'O e-mail informado não consta no banco de dados' 
                };
            }

            if (!bcrypt.compareSync(password, user.password)) {
    
                throw {
                    field   : 'password',
                    message : 'A senha informada é inválida' 
                };
            }

            const token = encryptJwt({ user_id : user.id });

            return res.status(200).json(HandleResponse({ 
                body : {
                    message         : 'Login realizado com sucesso',
                    access_token    : token
                } 
            }));
        
        } catch (err) {

            return res.status(400).json(HandleResponse({ errors: err }));
        }
    },
    update : async (req, res) => {

        const { name, email, password } = req.body;

        try {

            const id = await Users.update({
                name, email, password
            }, {
                where : { id : req.user_id }
            });

            const token = encryptJwt({ user_id : id });

            return res.status(200).json(HandleResponse({ 
                body : {
                    message         : 'Usuário atualizado com sucesso',
                    access_token    : token
                } 
            }));
        
        } catch (err) {

            return res.status(400).json(HandleResponse({ errors: err }));
        }
    },
    find : async (req, res) => {

        const { id } = req.params;

        try {

            if (!id) {

                throw 'O parãmetro "id" não foi informado';
            }

            const body = await Users.findOne({
                attributes : [ 'id', 'name', 'email', 'created_at', 'updated_at' ],
                where : { id }
            });

            return res.status(200).json(HandleResponse({ body }));
        
        } catch (err) {

            return res.status(400).json(HandleResponse({ errors : err }));
        }
    }
}