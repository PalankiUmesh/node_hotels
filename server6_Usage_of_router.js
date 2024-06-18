const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log("Welcome");
})

// Import the perons route file
const personRouters = require('./routes/peronsRoutes')
app.use('/person', personRouters); // use the routers

// Import Menu route file
const menuRouter = require('./routes/MenuRoutes')
app.use('/menu', menuRouter)

// comment added
app.listen(3000, () => {
    console.log("App is listiing at port 3000");
})