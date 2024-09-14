import User from "../models/userSchema.js"
import { CatchAsyncError } from "./CatchAsyncError.js"
import jwt from 'jsonwebtoken'
import ErrorHandler from "./ErrorMiddleware.js"

export const isUserAuthenticated = CatchAsyncError(async (req,res,next)=>{
    const token = req.cookies.UserToken
    if(!token){
        return next(new ErrorHandler("User Not Authenticated", 405))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    if(req.user.role !== "User"){
        return next(new ErrorHandler("User Not Authorized", 405))
    }
    next()
})