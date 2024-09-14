import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import User from "../Schemas/UserSchema.js";
import { generateToken } from "../utils/generateToken.js";

export let UserId = '66e4580c0fe5c8104c35d1c5';

export const LoginController = CatchAsyncError(async (req,res,next)=>{
    const {email, password} = req.body;
    if(!email, !password){
        return next(new ErrorHandler("Email or Password missing"), 401)
    }
    const user = await User.findOne({ email }).select('+password');
    // UserId = user._id;
    if(!user){
        return next(new ErrorHandler("User doesn't exist"), 401)
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect Email-ID or Password found"), 401)
    }
    console.log(UserId)
    generateToken(user, `Welcome ${user.firstName} ${user.lastName}`, 200, res)
})


export const RegisterController = CatchAsyncError(async (req,res,next)=>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
        return next(new ErrorHandler("Incomplete Info Found"), 403)
    }
    console.log(req.body)
    let newUser = await User.findOne({email})
    if(newUser){
        return next(new ErrorHandler("There exist User with this E-mail ID"), 403)
    }
    newUser = new User({
        firstName, lastName, email, password
    })
    await newUser.save()
    res.status(200).json({
        success: "True",
        message: "User Created Successfully",
        newUser
    })

})