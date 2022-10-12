require('./db/connect.js')
const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const cors = require('cors')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const ConnectDB = require('./db/connect.js')
app.use(cors());

require('dotenv').config()


//Middlewares 
app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

const port = process.env.Port || 3000;

const start = async() => {
    try {
        await ConnectDB(process.env.Mongo_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();