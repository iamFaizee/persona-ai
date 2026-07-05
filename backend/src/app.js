import express from 'express'
import cors from 'cors'
import {errorHandler} from './middleware/error.middleware.js'
import chatRoute from './routes/chat.routes.js'


const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "AI backend running"
    })
})

app.use('/api/chat', chatRoute)

app.use(errorHandler)

export default app