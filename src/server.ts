import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import busRoutes from './routes/busRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/user';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); 


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/admin/bus', busRoutes);
app.use('/api/admin/ticket', ticketRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Ticket Management System');
});


connectDB();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});