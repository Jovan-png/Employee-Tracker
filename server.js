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
            db.query(`SELECT * FROM department`,(err,rows)=>{
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
                    menu()
                }
            })

        }else if(data.menu === 'view all employees'){
            db.query(`SELECT * FROM employee`, (err, rows)=>{
                if(err){
                    console.log(err)
                }else{
                    console.table(rows)
                    menu()
                }
            })

        }else if(data.menu === 'add a department'){
             addDepartment()
        }else if(data.menu === 'add a role'){
            addRole()
       }else if(data.menu === 'add an employee'){
        addEmployee()
   }else if(data.menu === 'update employee role'){
    updateEmployee()
   }
})
}

const addDepartment = ()=>{
    const questions =[
        {
            type: 'text',
            name: 'department_name',
            message: 'Please enter the name of the department'
        
        },
        {
            type: 'text',
            name: 'dept_number',
            message: 'Please enter a valid department number!'
        }

    ]
    inquirer
    .prompt(questions)
   .then(data=>{
       
db.query(`INSERT INTO department (id, name) VALUES (${data.dept_number}, '${data.department_name}')`) 
menu()
       
   })
}


const addRole = () =>{
    const questions =[
        {
            type: 'text',
            name: 'role_id',
            message: 'Please enter an id number for the role.'
        
        },
        {
            type: 'text',
            name: 'role_title',
            message: 'Please enter the name of the role!'
        },
        {
            type: 'text',
            name: 'role_salary',
            message: 'Please enter the salary for the role! '
        },
        {
            type: 'text',
            name: 'role_dept',
            message: 'Please enter department id number for role!'
        }

    ]
    inquirer
    .prompt(questions)
    .then(data=> {
      
            db.query(`INSERT INTO roles (id, title, salary, department_id) VALUES (${data.role_id}, '${data.role_title}', ${data.role_salary}, ${data.role_dept}) `)
                menu()
            
    })
}
const addEmployee = ()=>{
    const questions = [
        {
            type: 'text',
            name: 'employ_Fname',
            message: 'Please enter employee first name',
        },
        {
            type: 'text',
            name: 'employ_Lname',
            message: 'Please enter employee last name',
        },
        {
            type: 'text',
            name: 'employ_role',
            message: 'Please enter employee role',
        },
        {
            type: 'text',
            name: 'employ_manager',
            message: 'Please enter employee manager id',
            default: 'NULL'
        },
    ]
    inquirer
    .prompt(questions)
    .then(data=>{
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.employ_Fname}', '${data.employ_Lname}', ${data.employ_role} ,${data.employ_manager})`)
        menu()
    })
}

const updateEmployee = ()=>{
    db.query(`SELECT * FROM employee`, (err,rows)=>{

    
    const questions = [
        {
            type: 'list',
            name: 'empoy_list',
            message: 'Please enter employee first name',
            choices: `${rows}`
        }
    ]
    inquirer
    .prompt(questions)

})
}


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