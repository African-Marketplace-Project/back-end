const router = require("express").Router();
const Users = require("./users-model");
const Items = require("../products/products-model");



router.get("/", (req, res) => { //get all users
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});


router.get("/:id", verifyUserId, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.getUserById(id);
        user.items = await Users.getItemsByUser(id);
        delete user.password;
        Promise.all(user.items.map(async item => {
            return item;
        }))
            .then(items => {
                res.status(200).json({ user });
            })
    } catch (error) {
        res.status(500).json({ error });
    }
});

function verifyUserId(req, res, next) {
    const id = req.params.id;
    Users.getUserById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "User Not Found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}



module.exports = router;
