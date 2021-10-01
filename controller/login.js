const { response, request } = require('express');


const checkLogin = (req = request, res = response) => {

    const {...login } = req.body;
    res.json({
        login
    });

};


module.exports = {
    checkLogin
};