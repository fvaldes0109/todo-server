const { response } = require("express")

const tasksGet = (req, res = response) => {

    res.json({
        msg: 'get API - controller'
    });
}

module.exports = {
    tasksGet,
}