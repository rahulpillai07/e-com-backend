import app from "./app";
import connect from "./dbConfig/dbConfig";
import dotenv from'dotenv'
import { User } from "./models/user";
import ProductModel from "./models/products";
import { Category } from "./models/category";
import { UserCart } from "./models/userCart";

dotenv.config({
    path: './.env'
})

connect()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started at port ${process.env.PORT}`)
    })
    .on('error',()=>{
        console.log('error connecting to the server');
    })
})
.catch(()=>{
     console.error('error connecting to the database');
})

