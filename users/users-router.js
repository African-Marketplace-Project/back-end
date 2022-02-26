const router = require("express").Router();
const Users = require("./users-model.js");
const Items = require("../products/products-model.js");



router.get("/", (req, res) => { //get all users
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});




module.exports = router;
