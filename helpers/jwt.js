const jsonwebtoken = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        jsonwebtoken.sign({ uid }, 'publicSecret', {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });

    });
};


module.exports = {
    generarJWT
};