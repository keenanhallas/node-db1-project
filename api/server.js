const express = require("express");
const accountsRouter = require("../data/seeds/accounts-router");

//const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).send("<h1>SQL Practice API</h1>");
});

server.use("/accounts", accountsRouter);

module.exports = server;
