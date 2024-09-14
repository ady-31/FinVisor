import express from 'express'
import { LoginController, RegisterController } from '../Controllers/authControllers.js'

const server = express.Router()

server.post('/login', LoginController)
server.post('/register', RegisterController)

export default server;
