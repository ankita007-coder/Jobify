//since we are using ES6modules here we need to use import instead of require
import 'express-async-errors'
import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import morgan from "morgan";
import mongoose from "mongoose";
const app = express();

import router from "./routers/JobRouter.js";
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev')); //it is used to log the information of our request  
}



//for getting data from the frontend
app.use(express.json());

app.get('/',(req,res)=>{//route handler or controller
    res.send("Hello World")
});
//for getting data from the frontend and sending confirmation
app.post('/',(req,res)=>{
    console.log(req);
    res.json({message: "data received",data: req.body})
})

app.use('/api/v1/jobs',router);

//displaying error when user tries to access links except the ones which are present
app.use('*',(req,res)=>{
    res.status(404).json({msg:"Page not found"})
})

app.use(errorHandlerMiddleware)
//check the port is running or not
//the dotenv port will change at the time of deployment
//if the port is not assigned in .env file the 5000 will be assigned to it

const port = process.env.PORT || 5000;
try {
    await mongoose.connect(process.env.MONGO_URL)
        app.listen(port,()=>{
        console.log(`server running on port ${port}`);
    })
} catch (error) {
    console.log("error while connecting:",error.message);
}
