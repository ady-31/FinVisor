import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { errorMiddleware } from './middlewares/ErrorMiddleware.js'
import AuthRouter from './Routes/authRoute.js'
import ApiRoute from './Routes/ApiRoute.js'
import { createProxyMiddleware } from 'http-proxy-middleware'

const server = express()
dotenv.config()


// Database Connection
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("Connected to mongoDB server");
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on("disconnected",()=>{
    console.log("Disconnected from mongoDB Server");
})

// Middlewares
server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(express.urlencoded({extended: true}))

// Routes
server.use('/api/users', AuthRouter)
server.use('/api', ApiRoute)
// server.use(cors());

server.use(express.json())   
server.use(errorMiddleware);

// App Listening
server.listen(process.env.PORT, ()=>{
    connect() // Database startup
    console.log("Server Started")
})

