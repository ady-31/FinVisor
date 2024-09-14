import express from 'express'
import { ApiCont } from '../Controllers/APICont.js'

const server = express.Router()

server.post('/chat', ApiCont)

export default server