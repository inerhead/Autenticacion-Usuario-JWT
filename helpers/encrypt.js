//import bcryptjs from "bcryptjs";
const bcryptjs = require('bcryptjs');
const { response } = require('express');


const createCustomHash = (word) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(word, salt);
};

const validarContrasena = (pass, hash, res = response) => {
    const passCorrect = bcryptjs.compareSync(pass, hash);
    let sw = true;
    if (!passCorrect) {
        res.status(400).json({
            msj: "Password Incorrecto !!!"
        });
        sw = false;
    }

    return sw;
};

module.exports = {
    createCustomHash,
    validarContrasena
};