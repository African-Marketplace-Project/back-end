const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");
//const Products = require("./products-model");



router.post("/register", validateUserFields, (req, res) => {  //register user
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8); // 2 ^ n
    user.password = hash;
    Users.addUser(user)
        .then(new_user => {
            const token = generateToken(new_user);
            delete new_user.password;
            res.status(201).json({ new_user, token });
        })
        .catch(error => {
            res.status(500).json({ err });
        });
});

router.post("/login", validateUserFields, (req, res) => {       //login
    let { email, password } = req.body;
    Users.findBy({ email, password })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {  //compare password
                const token = generateToken(user);
                delete user.password;
                res.status(200).json({
                    user, token 
                });
            } else {
                res.status(401).json({ message: "Incorrect Email or Password" });
            }
        })
        .catch(error => {
            res.status(500).json(err);
        });
});



function generateToken(user) {              //generate token
    const payload = {
        id: user.id, 
        email: user.email
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, process.env.SECRET || "secret", options);
}



function validateUserFields(req, res, next) {     //validate user inputs
    if (!req.body.email || !req.body.password) {
        res
            .status(400)
            .json({ message: "Email & password required." });
    } else {
        next();
    }
}

module.exports = router;