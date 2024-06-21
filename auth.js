const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')

passport.use(new LocalStrategy(async (un, pwd, done) => {
    try {
        // console.log('Recieved credentials : ', un, pwd);
        const user = await Person.findOne({username : un});
        if(!user) return done(null, false, {message : 'Invalid username'});
        const isPasswordMatch = await user.comparePassword(pwd);
        if(isPasswordMatch) return done(null, user);
        else return done(null, false, {message : 'Invalid password'});
    }
    catch(err) {
        return done(err);
    }
}))

module.exports = passport;