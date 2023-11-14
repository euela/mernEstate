import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';

config();

const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


mongoose.connect('mongodb://127.0.0.1/delala', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`Connected on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting:', err);
  });

app.get('/api/test',(req,res)=>{
    res.send('heelo world')
})

app.use('/api/auth',authRouter)
app.use('/api/user', userRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})












