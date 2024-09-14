import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, "Name must be of minimum 2 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, "Name must be of minimum 2 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Enter a valid email Address"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be of minimum 8 characters"],
        select: false
    }
})

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// This will be used to generate jsonwebtoken
UserSchema.methods.generateJsonWebToken =  function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    })
}

const User = mongoose.model("User", UserSchema)
export default User