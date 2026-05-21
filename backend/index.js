const express=require("express");
const app=express();
app.use(express.json())

const { userroute }=require("./routes/user.js");



app.use("/app/v1/user",userroute);


app.listen(3000,()=>{
    console.log("app listen on 3000 port")
})