import express from 'express'
import mongoose, { SchemaTypeOptions } from 'mongoose'
import { MONGO_URI } from './config';
import { AdminRoutes,VandorRoutes } from './routes';

const app = express();

mongoose.connect(MONGO_URI,(err)=>{
    if(err) console.log(err)
    else console.log("mongodb is connected")
})
app.use(express.json())
app.use('/admin',AdminRoutes)
app.use('/vandor',VandorRoutes)



app.listen(8000,()=>{
    console.log('App listening on port 8000')
})