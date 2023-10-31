import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';

mongoose.connect('mongodb://localhost/delala').then(()=>{
    console.log('Connected to database')
    }).catch((err)=>{
        console.log('error connecting',err)
    })

    
const app = express()

app.listen(3000,()=>{
    console.log('sever is running on port 3000!!')
});


app.use('/api/user', userRouter)