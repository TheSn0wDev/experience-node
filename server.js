const cors = require("cors");
const express = require("express");

const app = express();

var corsOptions = {
    origin: "http://localhots:8080"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.json({message: "Welcome to our Dashboard."});
});

require("./app/routes/dashboard.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});