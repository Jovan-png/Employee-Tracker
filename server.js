const express = require('express');
const router = require('express').Router();
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))






app.listen(PORT, (req,res)=>{
    console.log(`Sevver started on Port ${PORT}`)
})