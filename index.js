const server = require('./api/server')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 9000



server.listen(port, function (){
    console.log(` Server is listening on port ${port}`)
})