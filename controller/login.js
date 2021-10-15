const { response, request } = require('express');
const Usuario = require('../model/user');
const { validarContrasena } = require('../helpers/encrypt');
const { generarJWT } = require('../helpers/jwt');
const { verifyToken } = require('../helpers/google.verify');

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

const checkLoginGoogle = async (req, resp = response) => {
    const { id_token } = req.body;
   

    try {
        const { email, name, picture } = await verifyToken(id_token);
        const user = {
            nombre: name,
            email,
            img: picture
        };
        console.log('payload BE', user);

        let usuario = await  Usuario.findOne({ email });
        
        if (!usuario ) {
            usuario = new Usuario({ nombre: name, email, password: '123', rol: 'USER_ROLE', estado: true, google: true });
            console.log('Usuario', usuario);
            await usuario.save();
            //await usuario.save();
           console.log('Pasa por aqui');
        }

        if(!usuario.estado){
            return resp.status(403).json({
                err: "Hable con el admin"
            });
        }


        resp.json({
            msg: 'Todo bien ***',
            user
        });
    } catch (error) {
        resp.status(400).json({
            state: "bad",
            err: "error Verificando el token"
        });
    }


    
}; 


module.exports = {
    checkLogin,
    checkLoginGoogle
};