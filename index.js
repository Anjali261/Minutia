
//helmet help us to protect the express server by setting up various http headers. 
import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors"
import dotenv from "dotenv"
import morgan from 'morgan';
import helmet from "helmet"
import path from "path"
import multer from 'multer';
import { fileURLToPath } from 'url';

import {createPost} from "./controller/posts.js"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import { register } from "./controller/auth.js"
import { verifyToken } from './middleware/auth.js';
//CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// set up file storage config
const storage = multer.diskStorage({
    destination:function(req,dfile,cb){
        cb(null, "public/assets");

    },
    filename: function (req,file,cb){
        cb(null, file.originalname);
    }

});
const upload = multer({  storage});


// Routes with Files 
app.post("/auth/register" , upload.single("picture"), register);
app.post("/posts",verifyToken, upload.single("picture"),createPost);
//Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes)
app.use("/posts", postRoutes)

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


