// // JSON to object
// const jsonString = '{"name" : "Umesh", "age":25}';
// const jsonObj = JSON.parse(jsonString)
// console.log(typeof jsonObj.age)


// // Object to JSON
// const object = {
//     "Name": "Umesh",
//     "age": 27
// }
// const jsonFormat = JSON.stringify(object)
// console.log(typeof jsonFormat)

// creating express
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.get('/idly', (req, res) => {
    var idlyCos = {
        "Type" : "Rava idly",
        "size" : 10,
        "Chutney" : true
    }
    console.log(typeof idlyCos.Chutney)
    const objFormat = JSON.stringify(idlyCos)
    console.log(typeof objFormat)
    res.send(objFormat)
})

const Port = 3000;
app.listen(Port,()=>{
    console.log(`Listeing on port ${Port}`)
})
