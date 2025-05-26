import mongoose from 'mongoose';
const linker = "mongodb://localhost:27017/youtube_backend";
if (!linker){
  console.log("you are at wrong location plz.. check for the location: ");
}

mongoose.connect(linker)
.then(()=>{
  console.log("you mongoDB connect is established you can use that :-> ");
})
.catch(err=>{
  console.log("there is somthing which is wrong with your MongoDB: ");
  console.error(err);
})