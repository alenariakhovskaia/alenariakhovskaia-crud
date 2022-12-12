const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: {required: true},
        lowercase:true,
        validate: [isEmail, 'Please enter a valid email']
    },
    firstname: {
        type: String,
        required: [true, 'Please enter a firstname'],
        lowercase:true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter a lastname'],
        lowercase:true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    profile_img: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
        default: Date()
    }
}, {timestamps: true})

loginSchema.pre('save', async function(next) {
    const salt =  await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

loginSchema.statics.Login = async function(email, password) {
    const user = await this.findOne({email})
    if(user) {
        const auth =  await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        else {
            throw Error('incorrect password')
        }
    }
    else {
        throw Error('incorrect email')
    }
}

const RegisteredUsers = mongoose.model('RegisteredUsers', loginSchema)

module.exports = RegisteredUsers