import express, { Application } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
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

// Store active WebSocket connections
const clients = new Map<string, WebSocket>();

wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
  const url = new URL(req.url || '', `ws://localhost:${process.env.PORT || 5000}`);
  const userId = url.pathname.split('/').pop(); // Extract userId from /ws/chat/<userId>
  
  if (userId) {
    clients.set(userId, ws);
    console.log(`Client connected for user: ${userId}`);
    
    ws.on('close', () => {
      clients.delete(userId);
      console.log(`Client disconnected for user: ${userId}`);
    });
  }
});

// Event emitter for new messages
export const emitMessageToUser = (userId: string, message: any) => {
  const client = clients.get(userId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  }
};

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
