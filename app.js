const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser')
const port = 3000;
const DBuri = "mongodb://localhost:27017";
const endPoints = require('./src/endPoints')

mongoose.set('strictQuery', false);
mongoose.connect(DBuri,(e)=>{
    if(e)console.log(e);
    else console.log("Connected to Database")
})
const app = express();
app.use(body_parser.json());
app.use(endPoints)

app.use("*",(req,res)=>{
    return res.status(404).json({
        massage:"Page not found."
    })
})
app.listen(port,(e)=>{
    if(e){
        console.log(e)
    }
    else{
        console.log(`Server is running on port ${port}`)
    }
})