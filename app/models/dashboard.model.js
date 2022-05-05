const sql = require("./db.js");

const User = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
        newUser.username,
        newUser.email,
        newUser.password
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.getUser = (user, result) => {
    sql.query("SELECT * from users where email = ?", [
        user.email
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, res);
        // result(res);
    });
};

module.exports = User;