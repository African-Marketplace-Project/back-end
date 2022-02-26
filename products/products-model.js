
const db = require("../data/dbConfig");

const Users = require("../users/users-model");

module.exports = {
    getAllProducts,
    
};

function getAllProducts() {
    return db("product").join("user", "product.user_id", "product.id")
        .select("product.id", "product.name", "product.description", "product.city", "product.price", "product.user_id", "user.email", "user.username",);
}

