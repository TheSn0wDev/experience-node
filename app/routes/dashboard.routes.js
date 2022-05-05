const User = require("../controllers/dashboard.controller.js");
var router = require("express").Router();

module.exports = app => {
    router.post("/", User.create);
    router.get("/email", User.getUser);

    app.use('/api/dashboard', router);
};