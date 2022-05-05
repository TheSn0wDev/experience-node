const Users = require("../models/dashboard.model.js");
const bcrypt = require("bcrypt")

async function hashPasswd (password) {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
};

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: await hashPasswd(req.body.password)
    });

    Users.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        else res.send(data);
    });
};

exports.getUser = async (req, res) => {
    if (!req.query) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const user = new Users({
        email: req.query.email,
        password: req.query.password
    });
    Users.getUser(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the user."
            });
        else {
            bcrypt.compare(req.query.password, JSON.parse(JSON.stringify(data))[0].password).then(function(result) {
                if (result)
                    res.send(data);
                else
                    res.status(500).send({
                        message: "Wrong password"
                    });
            });
        }
    });
};