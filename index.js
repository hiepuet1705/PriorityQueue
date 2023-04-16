import express, { application, response } from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

const app = express();
dotenv.config();

const connect = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Booking',{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useBigInt64: true,
        })
        console.log('Connected to db')
        
    } catch (err) {
        throw (err);
    }
}
connect();
mongoose.connection.on('disconnected', () =>{
    console.log('Cannot conect to db');
})
app.get('/', (req,res)=>{
    res.send('this is home page')
})

// middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/auth',authRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).json(errorMessage);
    next();
})

app.listen(8800, ()=>{
    console.log('connected to backend server');
    
});