import express, { Application } from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import conversationRoutes from './routes/conversationRoutes';
import messageRoutes from './routes/messageRoutes';

dotenv.config();
connectDB();

const app: Application = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
