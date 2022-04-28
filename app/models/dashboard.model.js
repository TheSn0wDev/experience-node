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

User.findById = (id, result) => {
    sql.query("SELECT * FROM users WHERE id = ${id}", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = User;
