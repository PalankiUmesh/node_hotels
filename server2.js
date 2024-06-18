var fs = require('fs')
var os = require('os')
var prompt = require('prompt-sync')();
fs.appendFile('greeting.txt', "\nHey world!", () => {
    console.log();
});

var notes = require('./notes.js')
var _ = require('lodash')

console.log('server page loaded')
console.log(notes.age)
console.log(notes.check())

var data = ["Person", 'Person', 1, 2, 1, 1, 2, "a", 'B']
var filter = _.uniq(data)
console.log(filter)

var arr = []
for(let i=0; i<5; i++) {
    var num = prompt();
    arr.push(parseInt(num));
}
console.log(arr)