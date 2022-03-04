const db = require("../data/dbConfig");


module.exports = {
    addUser,
    getAll,
    findBy,
    getUserById,
    getProductByUser,
    updateUser,
    deleteUser,
    };

function getAll() {
    return db("user");
}

function getUserById(id) {
    return db("user")
        .where({ id })
        .first();
}

function findBy(filter) {
    return db("user").where(filter);
}

async function addUser(user) {
    const [id] = await db("user").insert(user, "id");

    return getUserById(id);
}

function getProductByUser(id) {
    return db("item").where({ "user_id": id });
}

async function updateUser(id, changes) {
    await db("user")
        .where({ id })
        .update(changes)

    return getUserById(id);
}

function deleteUser(id) {
    return db("user")
        .where({ id })
        .del();
}

