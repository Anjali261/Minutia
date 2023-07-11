
//helmet help us to protect the express server by setting up various http headers. 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require("helmet");
const bodyparser = require("body-parser")
const multer = require("multer");
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const path = require("path");
import {fileURLToPath} from "url"

//CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//middleware
app.use(cors());
app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));

mongoose.set('strictQuery', false);
const connectDB = async() =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,

        })
        console.log(`MongoDB connected: ${con.connection.host}`);
        
    }catch(error){
        console.log(error);
        process.exit(1);

    }
}
connectDB(); 






app.listen(process.env.PORT, () =>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
})


