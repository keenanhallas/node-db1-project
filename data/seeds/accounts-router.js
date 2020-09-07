const express = require("express");

const db = require("../dbConfig");
const { from } = require("../dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
    db.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err.message });
        });
});

module.exports = router;