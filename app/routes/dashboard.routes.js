// const User = require("../models/dashboard.model.js");
const User = require("../controllers/dashboard.controller.js");
var router = require("express").Router();

module.exports = app => {

    router.post("/", User.create);
    router.get("/:id", User.findById);
    router.delete("/:id", User.remove);
    router.delete("/", User.removeAll);

    app.use('/api/dashboard', router);
};