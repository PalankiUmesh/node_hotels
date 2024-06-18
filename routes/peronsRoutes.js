const express = require('express')
const router = express.Router()
const Person = require('./../models/Person');

// POST API to add a person data -- Approch 2
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('Data fetched');
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({Error: "Internal Server Errror"})
    }
})

// Parameter API
router.get('/:workType', async (req, res) => {
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

// PUT method to update person data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameters
        const personUpdatedData = req.body; // Updated data from the person
        const response = await Person.findByIdAndUpdate(personId, personUpdatedData, {
            new : true, // Return the updated document
            runValidators : true // Run mongoose validation
        })
        if(!response) {
            res.status(404).json({error : 'Person id invalid'})
        }
        console.log('Person fetched based on ', personId);
        res.status(200).json(response)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({Error : 'Internal server error'})
    }
})

// DELETE method to delete person using unique id
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            res.status(404).json({Error: 'Invalid person id'})
        }
        console.log('Person deleted');
        res.status(200).json({message : 'Person deleted sucessfully'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({Error : 'Internal server error'})
    }
})

module.exports = router;