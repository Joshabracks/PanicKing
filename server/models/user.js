const mongoose = require('mongoose'); 
LeaderBoardSchema = new mongoose.Schema({  
    Name: String,  
    lname: String,  
    email: String,  
    password: String,  
}, { timestamps: true });  
LeaderBoard = mongoose.model('LeaderBoard', LeaderBoardSchema);