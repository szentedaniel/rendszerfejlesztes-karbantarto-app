// Import the express in typescript file
import express from 'express';
import { prismaQuerry } from './script';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3000;

// Handling '/' Request
app.get('/', (_req, _res) => {
	_res.send("TypeScript With Expresss ASDASDAS");
});

// Handling '/' Request
app.get('/kecske', (_req, _res) => {
	_res.send("Béka");
});

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express
		http://localhost:${port}/`);
        prismaQuerry()
});

