const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem')

// body parse -- it is a middleware and it converts the http data and converts it into json object.
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to the hotel");
})

// // POST route to add a person
// app.post('/person', (req, res) => {
//     const data = req.body // Assuming the request body contains the person data
    
//     // Create a new person document using the mongoose model
//     const newPerson = new Person(data);
//     newPerson.save((error, savedPerson) => {
//         if(error) {
//             console.log('Error occured while saving perons', error);
//             res.status(500).json({error: 'Internal server error'});
//         } else {
//             console.log('Data saved sucessfully');
//             res.status(200).json(savedPerson);
//         }
//     })
// })

// POST API to add a person data -- Approch 2
app.post('/person', async (req, res) => {
    try {
        const data = req.body; // Assuming the req body contains the person data
        const newPerson = new Person(data); // Create a new person document using using mongoose model
        // Save the newPeron to the database
        const respose = await newPerson.save();
        console.log('Data saved')
        res.status(200).json(respose);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

// GET method to get data from database
app.get('/person', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('Data fetched');
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({Error: "Internal Server Errror"})
    }
})

// GET method to get the menu items from the database
app.get('/menu', async (res, req) => {
    try {
        const data =await MenuItem.find();
        console.log('Menu fetched');
        res.status(200).json(data)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({Error: "Internal Server Error"})
    }
})

// POST Method for menu
app.post('/menu', async (req, res) => {
    try {
        const data = req.body;
        const Menu = new MenuItem(data);
        const respose = await Menu.save();
        console.log("Menu saved");
        res.status(200).json(respose);
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({Error: "Internal Server Error"})
    }
})

// Parameter API
app.get('/person/:workType', async (req, res) => {
    try{
        const workType = req.params.workType; // Extract the workType from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work: workType})
            console.log(workType, " fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({error: "Invalid work type"})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({Error: "Internal Server Error"})
    }
})

app.listen(3000, () => {
    console.log('App is listening at port 3000');
})