const mongoose = require('mongoose')
require('dotenv').config();

// Define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'      // Replace hotels with any other database name
// const mongoURL = process.env.DB_URL;  

// Setup mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintain a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listener of database
db.on('connected', () => {
    console.log("Connected to mongodb server")
});
db.on('error', (err) => {
    console.log("Error while connecting, ", err)
});
db.on('disconnected', () => {
    console.log("MongoDB disconnected");
})

// Exmort the db connection
module.exports = db;
