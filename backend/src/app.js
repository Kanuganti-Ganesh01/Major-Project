import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { connectToSocket } from './controllers/socketManager.js';
import cors from 'cors';
import userRoutes from './routers/users.routes.js';
import geminiRoutes from './routers/gemini.routes.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ limit: '40kb', extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/gemini', geminiRoutes);

const start = async () => {
  app.set('mongo_user');
  const connectionDb = await mongoose.connect(
    'mongodb+srv://bhagathpunna:Punna2003@cluster1.q5dxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
  );

  console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`);
  server.listen(app.get('port'), () => {
    console.log('LISTENIN ON PORT 8000');
  });
};

start();