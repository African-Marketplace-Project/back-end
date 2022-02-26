const router = require("express").Router();
const Items = require("./products-model");


router.get("/", async (req, res) => {
    try {
        const items = await Items.getAllProducts();
        Promise.all(items.map(async item => {
            return item;
        })).then(items => {
            res.status(200).json(items);
        })

    } catch (error) {
        res.status(500).json({ error });
    }
});


router.get("/:id", async (req, res) => { //get one product
    next()
});


router.post("/", async (req, res) => { //create one product
    next()
});


router.put("/:id", async (req, res) => { //update one product
    next()
});

router.delete("/:id", async (req, res) => { //delete one product
    next()
});

//need to add a route to get all products by category?
//need to add a route to get all products by user?
//middleware?

module.exports = router;