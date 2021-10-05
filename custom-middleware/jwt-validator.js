const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/user');

const validarToken = async(req = request, res = response, next) => {


    try {

        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({ err: "Falta token" });
        }
        const { uid } = jwt.verify(token, 'publicSecret');

        const usuarioBD = await Usuario.findById(uid);

        req.usuario = usuarioBD;

        next();
    } catch (error) {
        console.log(error + "jajaj");
        res.status(401).json({ msg: 'Token no valido' });
    }
};


module.exports = {
    validarToken
};