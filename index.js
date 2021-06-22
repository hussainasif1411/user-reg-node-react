const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "1234",
    database: "react",
});

//db.connect();

app.post("/create", (req, res) => {

    const name = req.body.name;
    console.log(name);
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;

    db.query("INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)",
        [name, email, password, age],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.send("Data Inserted!");
            }
        }
    )
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.listen(8000, () => {
    console.log("Server started at port 8000");
});