import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import conectarDB from './config/db.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

// Configure CORS
const whitelist = ['http://127.0.0.1:5173'];

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Error de Cors'));
		}
	}
};

app.use(cors(corsOptions));

// Routing
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

conectarDB();

app.listen(4000, () => {
	console.log('Servidor corriendo en el puerto 4000');
});
