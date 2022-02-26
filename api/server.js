const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
//const colors = require("colors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const productsRouter = require("../products/products-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: '*' }))
//server.use(colors.rainbow)
 
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/products", productsRouter);

server.get("/", (req, res) => { //get all users
    res.send(" hey there ");
});

module.exports = server;