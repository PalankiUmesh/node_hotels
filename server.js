
// function add(a,b) {
//     return a+b;
// }

// var add = function(a,b) {
//     return a+b;
// }

// function callback() {
//     console.log("Callback is called");
// }
// var add = (a, b, callback) => {
//     console.log(a+b);
//     callback();
// }

var add = (a, b) => console.log(a + b);

(function() {
    console.log("Hey");
})();

add(10 ,20, (function() {
    console.log("Hey");
})());


// var sub = (a, b) => {
//     console.log(a-b);
// }
// var mul = (a, b, sub) => {
//     console.log(a*b);
//     sub(a, b);
// }

// mul(10 ,3, sub)



// var add = (a, b, fun) => {
//     console.log(a+b);
//     fun();
// }
// add(10, 20, function() {
//     console.log("Added sucessfully");
// })

// add(10, 20, () => {console.log('Added sucessfully 2')}); 

// var sub = (a, b) => {
//     return (a+b);
// }

