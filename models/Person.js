const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    }, 
    age : {
        type : Number
    }, 
    work : {
        type: String, 
        enum : ['chef', 'waiter', 'manager'],
        required : true
    },
    mobile : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type: String
    },
    salary : {
        type : Number,
        required : true
    },
    username : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    }

})

personSchema.pre('save', async function(next) {
    const person = this;
    if(!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10); // hash password generating 
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }
    catch(err) {
        return next(err);
    }
})

// how to extract the password from hashed password
// 1. prince ---> djhkvaslcvaslhvelwslhvcv
// 2. login ---> agarwal
// now, kedvlgdsiugigvdsag ---> extracts salt
// salt + agarwal ---> iusguilaegvfilgaevilycfvle /// this compare the hashed password with newly generated hashed password if it matches then it gets into.

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(err) {
        console.log(err);
    }
}

// Create person model 
const Person = mongoose.model('Person', personSchema);
module.exports = Person;