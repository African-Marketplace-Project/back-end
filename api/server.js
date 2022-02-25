const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const colors = require("colors");


const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: '*' }))
server.use(colors.rainbow)
 


server.get("/", (req, res) => {
    res.send(" hey there ");
});

module.exports = server;