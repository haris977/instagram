import {model} from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailSender = async(email,title,body)=>{
  try{
    let transporter = nodemailer.createTransport({
      
    })
  }
  catch(error){
    console.log(error);
    return error.message;
  }
}