const express = require('express')
const app = express()
const prompt = require('prompt-sync')()



app.get('/', (req, res) => {
    res.send("Welcome to NODEJS")
})

app.post('/items', (req, res) => {
    res.sent("Item saved");
})

app.listen(3000, () => {
    console.log("App is lisiting on port 3000");
})
