const mongoose=require('mongoose');

function connectDB(){
    mongoose.connect("mongodb+srv://growzydb:growzy1234@cluster0.v0vimca.mongodb.net/?appName=Cluster0")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB:", err);
    });
}
module.exports=connectDB;
