const inquirer = require('inquirer')
const mysql = require('mysql2')
const db = require("../server");


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
           
                const sql = `SELECT * FROM employee`;
            
            db.query(sql,(err,rows)=>{
                if(err){
                    res.status(500).json({ error: err.message});
                    return;
                }
                console.table(rows)
            })
            
        }
    })
}



module.exports = {menu}; 