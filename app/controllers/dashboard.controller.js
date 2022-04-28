const Users = require("../models/dashboard.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    console.log(user);

    Users.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Users.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.remove = (req, res) => {
    Users.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with id " + req.params.id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

exports.removeAll = (req, res) => {
    Users.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        else res.send({ message: `All users were deleted successfully!` });
    });
};
