const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config();
const passport = require('./auth')

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); // move on to next phase
}
app.use(logRequest);  // use log globally


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session : false});
app.get('/',(req, res) => {  // to use logRequest personally to particular api we use ----  app.get('/', logRequest, () => {})
    res.send("Welcome");
}) 

const personRouters = require('./routes/peronsRoutes')  // Import the perons route file
app.use('/person', localAuthMiddleware, personRouters); // use the routers

const menuRouter = require('./routes/MenuRoutes') // Import Menu route file
app.use('/menu', menuRouter)

// Comment added for testing purpose
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("App is listiing at port 3000");
})