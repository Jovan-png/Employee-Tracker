const express = require('express');
const inquirer = require('inquirer')
const router = require('express').Router();
const mysql = require('mysql2');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: false}))


const menu = ()=>{
    inquirer
    .prompt({
        type: 'list',
        name: 'menu',
        message: 'Please Select What You Would Like To Do',
        choices: ['view all departments','view all roles','view all employees','add a department'
    ,'add a role','add an employee','update employee role']
    })
    .then(data=>{
        if(data.menu === 'view all departments'){
            db.query(`SELECT * FROM employee 
            RIGHT JOIN roles`,(err,rows)=>{
                if(err){
                    console.log(err)
                }else{
                console.table(rows)
                menu()
                }
            })
            
        }else if(data.menu === 'view all roles'){
            db.query(`SELECT * FROM roles`, (err, rows)=>{
                if(err){
                console.log(err)
                }else{
                    console.table(rows)
                }
            })

        }else if(data.menu === 'view all employees'){
            db.query(`SELECT * FROM department`, (err, rows)=>{
                if(err){
                    console.log(err)
                }else{
                    console.table(rows)
                }
            })

        }
    })
}
// add a department
// add a role
// add an employee
// update employee role


// const view all roles
// const view all employees



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'HelloWorld!',
    database: 'company'
})

db.connect(err =>{
if (err)throw err;
console.log('Database Connected')
app.listen(PORT, ()=>{
    console.log(`Sevver started on Port ${PORT}`);
});
});

menu()
module.exports = db;