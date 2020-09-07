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

router.get("/:id", (req, res) => {
    const accountId = req.params.id;

    db.select('*')
        .from('accounts')
        .where({ id: accountId })
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err.message });
        });
});

router.post("/", (req, res) => {
    account = req.body;

    db('accounts')
        .insert(account, 'id')
        .returning('id')
        .then(ids => {
            res.status(201).json({ inserted: ids });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err.message });
        });
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    const accountId = req.params.id;

    db('accounts')
        .where({ id: accountId })
        .update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: "Updated successfully!" });
            } else {
                res.status(404).json({ message: "Account not found!" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err.message });
        });
});

router.delete("/:id", (req, res) => {
    const accountId = req.params.id;

    db('accounts')
        .where({ id: accountId })
        .del()
        .then(count => {
            if (count) {
                res.status(200).json({ message: 'Deleted successfully' });
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;