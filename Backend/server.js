import express from 'express'
import './configration/mongoDBconnection.js'
const app = express();
app.use(express.json());
import authroute from './router/AuthRouter.js';
import authprofile from './router/AuthProfile.js';
import dotenv from 'dotenv';
dotenv.config();
app.get('/',async(req,res)=>{
  res.send("he he...")
})
const port = 5000;
app.use('/api/v1',authroute);
app.use('/api/v1',authprofile); 
app.listen(port,()=>{
  console.log(`the app is listning at port ${port}`);
})
