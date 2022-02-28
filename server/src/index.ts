// Import the express in typescript file
import express from 'express'
import createError from 'http-errors'
import morgan from 'morgan'
import cors from 'cors'
require('dotenv').config()

// Import stuffs for Swagger
import swaggerUI from 'swagger-ui-express'
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yaml')

// Initialize the express engine
const app: express.Application = express()


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// Take a port from env or 3000 for running server.
const PORT: number = Number(process.env.PORT) || 3000



app.get('/', async (req, res, next) => {
  res.send({ message: 'Stabil 🗿' })
})

app.get('/db', async (req, res, next) => {
  res.sendFile('db.html', { root: './docs/Database' })
})

// Api routes
app.use('/api', require('../routes/api.route'))

// Api docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Error middleware
interface Error {
  status: number,
  message: string
}

app.use((req, res, next) => {
  next(new createError.NotFound())
})

app.use((err: Error, req: express.Request, res: express.Response, next: any) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
})

// Server setup
app.listen(PORT, () => {
  console.log(`🏃 Server is running on http://localhost:${PORT}/ 🏃`)
  console.log(`📚 API Documentation on http://localhost:${PORT}/api-docs 📚`)
  console.log(`🖨  Database schema on http://localhost:${PORT}/db 🖨`)

})

