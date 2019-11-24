const express = require("express");

const server = express();

const users = ["Dhiego", "Max", "aaa"];

server.use(express.json());

server.use((req, res, next) => {
    console.time("Request")
    console.log(`method: ${req.method}, url: ${req.url}`);

    console.timeEnd("Request")
    return next();
})

function checkUserExists(req, res, next) {
    if (!req.body.name) return res.status(400).json({ error: "User not found" })
    return next()
}

server.get("/users/:index", (req, res) => {
    const { index } = req.params;

    res.json({ message: users[index] })
});

server.get("/users/", (req, res) => {
    res.json({ users })
});

server.post("/user/", checkUserExists, (req, res) => {
    const { name } = req.body
    users.push(name)
    res.json({ users })
});

server.put("/user/:index", checkUserExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body
    users[index] = name;
    res.json({ users });
});

server.delete("/user/:index", (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    res.json({ users });
});

server.listen(3000);
