const jwt = require('jsonwebtoken')
const path = require("path");

const RegisteredUsers = require('../model/userSchema')

const handleError = (err) => {
    let errors = { email: '', firstname: '', lastname: '', password: ''}

    if(err.code === 11000) {
        errors.email = 'This email is already registered!'
    }
    if(err.message.includes('RegisteredUsers validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    if(err.message === 'incorrect email') {
        errors.email = 'that email isn\'t registered'
    }
    if(err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    return errors
}

const maxAge = 24 * 60 * 60 * 7

const createToken = (id) => {
    return jwt.sign({id}, 'secret', {expiresIn: maxAge})
}


module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    const {email, firstname, lastname, password } = req.body
    try{
        const user = await RegisteredUsers.create({email, firstname, lastname, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxAge * 1000 })
        res.status(201).json({user: user._id})
    }
    catch(err) {
        const refinedError = handleError(err)
        console.log(refinedError)
        res.status(400).json({refinedError})
    }
    res.render('signup')
}


module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.login_post = async (req, res) => {
    const {email_login, password_login} = req.body

    try{
        const user = await RegisteredUsers.Login(email_login, password_login)
        const token = createToken(user._id)
        res.cookie('jwt', token)
        res.status(200).json({user: user._id})
    }
    catch (error) {
        const refinedError = handleError(error)
        res.status(400).json({refinedError})
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/login')
}