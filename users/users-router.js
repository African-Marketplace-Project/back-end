const router = require("express").Router();





router.get("/", (req, res) => { //get all users
    next()
});



router.get("/:id", async (req, res) => { //get one user 
    next()
});


router.put("/:id", (req, res) => { //update one user
   next()
});



router.delete("/:id", (req, res) => { //delete one user
    next()
});



module.exports = router;