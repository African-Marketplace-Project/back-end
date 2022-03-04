const router = require("express").Router();
const Product = require("./products-model");
const restricted = require("../auth/restricted-middleware.js");


router.get("/", async (req, res) => { //get all items
    try {
        const items = await Product.getAllProducts();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ 
            message: "Failed to get all items" 
        });
    }
});



router.get("/:id",verifyItem, async (req, res) => { //get one product
    try {
        const id = req.params.id;
        const item = await Product.getProductById(id);
        res.status(200).json({ item });
    } catch (err) {
        res.status(500).json("err!");
    }
});


router.post("/", restricted, verifyProductInputs, (req, res) => { //add new item
    Product.addNewItem(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})


router.put("/:id", restricted, verifyItem, verifyProductEdits, (req, res) => { //update one product
    const id = req.params.id;
    const changes = req.body;
    Product.updateItem(id, changes)
        .then(updatedItem => {
            res.status(201).json(updatedItem);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

router.delete("/:id", restricted, verifyItem, (req, res) => {
    const id = req.params.id;
    Product.deleteItem(id)
        .then(deletedItem => {
            res.status(200).json({ message: "This item is now deleted from the database." });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

//need to add a route to get all products by category?
//need to add a route to get all products by user?
//middleware?

function verifyItem(req, res, next) {
    const id = req.params.id;
    Product.getProductById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ 
                    message: "Item Not Found."
                 });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}


function verifyProductInputs(req, res, next) {
    if (!req.body.name || !req.body.city || !req.body.country || !req.body.price || !req.body.user_id) {
        res
            .status(400)
            .json({ message: "One of these fields is not properly filled out: name, city, price, or user_id" });
    } else {
        next();
    }
}

function verifyProductEdits(req, res, next) {
    if (req.body.name === null || req.body.city === null || req.body.country === null || req.body.price === null || req.body.user_id === null ||
        req.body.name === "" || req.body.city === "" || req.body.country === "" || req.body.price === "" || req.body.user_id === "") {
        res
            .status(400)
            .json({ message: "One of these fields is not properly filled out: name, city, price, or user_id" });
    } else {
        next();
    }
}



module.exports = router;