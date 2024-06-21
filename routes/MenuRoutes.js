const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/MenuItem');

// GET method to get the menu items from the database
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data fetched')
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({Error : 'Internal Server error'});
    }
})

// POST Method for menu
router.post('/', async (req, res) => {
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

// GET method to fetch data based on taste
router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const response = await MenuItem.find({taste : tasteType});
            console.log("Menu fetched based on Taste")
            res.status(200).json(response)
        } else {
            res.status(404).json({error: 'Invalid taste type'})
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router;
