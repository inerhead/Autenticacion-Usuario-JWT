const { response, request } = require('express');
const Usuario = require('../model/user');
const { validarContrasena } = require('../helpers/encrypt');
const { generarJWT } = require('../helpers/jwt');

const checkLogin = async(req = request, res = response) => {

    try {
        const { email, password } = req.body;

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ email });

        // Verificar el estado del usuario
        const { estado } = usuario;

        if (!estado) {
            return res.status(400).json({
                msj: "Usuario Inactivo en BD"
            });
        }
        //Verificar contraseña        
        const isCorrect = validarContrasena(password, usuario.password, res);

        // Generar JWT
        //console.log(usuario.id);
        const token = await generarJWT(usuario.id);
        console.log(token);
        isCorrect ?
            res.json({
                usuario,
                token
            }) : "";
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msj: "Hable con el Admin"
        });
    }
};


module.exports = {
    checkLogin
};