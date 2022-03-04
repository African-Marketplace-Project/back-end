
const db = require("../data/dbConfig");

const Users = require("../users/users-model");

module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProduct,
    deleteProduct,  
};


function getAllProducts() {
    return db("product as p").join("user as u", "p.user_id", "p.id")
        .select("p.id", "p.name", "p.description", "p.city", "p.price", "p.user_id", "u.email", "u.username",);
}


function getProductById(id) {
    return db("product as p")
        .where("p.id", id)
        .first()
        .join("user as u", "p.user_id", "u.id")
        .select("p.id", "p.name", "p.description", "p.city", "p.price", "p.user_id", "u.email", "u.username", );
}


async function addNewProduct(item) {
    const [id] = await db("products").insert(item, "id");
    return getProductById(id);
}


async function updateProduct(id, changes) {
    await db("products")
        .where({ id })
        .update(changes)

    const item = await getProductById(id)
    return Users.getProductByUser(item.user_id);
}


function deleteProduct(id) {
    return db("products")
        .where({ id })
        .del();
}

