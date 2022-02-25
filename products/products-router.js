const router = require("express").Router();




router.get("/", async (req, res) => {  //get all products
    next()
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