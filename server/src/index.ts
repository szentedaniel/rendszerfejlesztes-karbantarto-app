// Import the express in typescript file
import express from 'express'
import createError from 'http-errors'
import morgan from 'morgan'
require('dotenv').config()

import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

// Initialize the express engine
const app: express.Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Take a port from env or 3000 for running server.
const PORT: number = Number(process.env.PORT) || 3000;

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('../routes/api.route'));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./routes/**.ts"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use((req, res, next) => {
  next(new createError.NotFound());
});

app.use((err: { status: number; message: string; }, req: any, res: { status: (arg0: any) => void; send: (arg0: { status: any; message: any; }) => void; }, next: any) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Server setup
app.listen(PORT, () => {
	console.log(`TypeScript with Express
		http://localhost:${PORT}/`);
        //prismaQuerry()
});

