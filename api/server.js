const express = require("express");
const helmet = require("helmet");
const cors = require("cors");



const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({ origin: '*' }))
 


server.get("/", (req, res) => {
    res.send(" hey there ");
});

module.exports = server;