const mongoose = require('mongoose');
const schema = mongoose.Schema;

await mongoose.connect("mongodb+srv://growzy:$cXrV7CJ*iQgF@f@cluster0.v0vimca.mongodb.net/?appName=Cluster0");
const userSchema = new schema({
   
    email: {
        type: String,   
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true
    },
     firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    },
    role: String
}); 


const User = mongoose.model('User', userSchema);

module.exports = User;
