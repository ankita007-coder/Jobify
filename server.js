//since we are using ES6modules here we need to use import instead of require
import 'express-async-errors'
import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import morgan from "morgan";
import mongoose from "mongoose";
const app = express();
import cookieParser from 'cookie-parser';

import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

//inorder to avoid getting null values from user we use validator from express-validator
import { authenticateUser } from "./middlewares/authMiddleware.js";
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';
import JobRouter from "./routers/JobRouter.js";

//public
//The dirname function is used to get the directory name of a path.
import {dirname} from 'path';
//The fileURLToPath function is used to convert a file URL to a file system path.
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';
          


/*import.meta.url is a special variable in ECMAScript modules that provides the URL of 
the current module.
fileURLToPath(import.meta.url) converts the file URL of the module to a file system path.
dirname(fileURLToPath(import.meta.url)) extracts the directory name from the file system path, 
giving you the current directory of the module.
*/
const __dirname = dirname(fileURLToPath(import.meta.url))


if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev')); //it is used to log the information of our request  
}

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
  });
// Serve static files from the 'public' directory on the browser
app.use(express.static(path.resolve(__dirname,'./public')));

app.use(cookieParser());

// Enable parsing of JSON data in request bodies
app.use(express.json());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authenticateUser,JobRouter);
app.use('/api/v1/users',authenticateUser,userRouter)
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
