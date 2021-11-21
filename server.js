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
            db.query(`SELECT department.id AS Dept_ID, department.name AS Dept_Name FROM department`,(err,rows)=>{
                if(err){
                    console.log(err)
                }else{
                console.table(rows)
                menu()
                }
            })
            
        }else if(data.menu === 'view all roles'){
            db.query(`SELECT roles.title,roles.salary,roles.id AS ID, department.name AS Department FROM roles INNER JOIN department ON roles.department_id = department.id`, (err, rows)=>{
                if(err){
                console.log(err)
                }else{
                   console.table(rows)
                    menu()
                }
            })

        }else if(data.menu === 'view all employees'){
            db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role, roles.salary AS Salary, department.name AS Department FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id
            
             `, (err, rows)=>{
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
    db.query(`SELECT * FROM department`, (err,rows) => {

 console.table(rows)
 console.log('If the department id is already taken it will throw an error');
    const questions =[
        {
            type: 'text',
            name: 'department_name',
            message: 'Please enter the name of the department'
        
        },
        {
            type: 'number',
            name: 'dept_number',
            message: 'Please enter a valid department number!',
            default: `${Math.floor(Math.random()* 100 + 1)}`
        }

    ]

    inquirer
    .prompt(questions)
   .then(data=>{
       
db.query(`INSERT INTO department (id, name) VALUES (${data.dept_number}, '${data.department_name}')`) 
menu()
       
   })
})
}


const addRole = () =>{
    db.query(`SELECT * FROM department`, (err,rows) => {
    const questions =[
        {
            type: 'number',
            name: 'role_id',
            message: 'Please enter an id number for the role.',
            default: `${Math.floor(Math.random()* 100 + 1)}`
        
        },
        {
            type: 'text',
            name: 'role_title',
            message: 'Please enter the name of the role!',
            default: 'Burger Developer'
        },
        {
            type: 'number',
            name: 'role_salary',
            message: 'Please enter the salary for the role! ',
            default: '50000'
        },
        {
            type: 'list',
            name: 'role_dept',
            message: 'Please select department id number for role! (Department Must Exist!)',
            choices: function(){
                let roleArr = [];;
                for(i=0; i < rows.length; i++){
                    roleArr.push(rows[i].id)
                    console.table(" ID "+rows[i].id +` Name `+ rows[i].name)
                }
                return roleArr
            },
        }

    ]
    
    inquirer
    .prompt(questions)
    .then(data=> {
      
            db.query(`INSERT INTO roles (id, title, salary, department_id) VALUES (${data.role_id}, '${data.role_title}', ${data.role_salary}, ${data.role_dept})`);
            menu();
            
    })
    .catch(err=>{
        if(err){
            console.log(err)
            menu()
        }
    })
})
}
const addEmployee = ()=>{
    db.query(`SELECT *  FROM roles`, (err,rows) => {
    const questions = [
        {
            type: 'text',
            name: 'employ_Fname',
            message: 'Please enter employee first name',
            default: 'Jovan'
        },
        {
            type: 'text',
            name: 'employ_Lname',
            message: 'Please enter employee last name',
            default: 'Norrington'
        },
        {
            type: 'list',
            name: 'employ_role',
            message: 'Please enter employee role id',
            choices: function(){
                let addemployArr = [];;
                for(i=0; i < rows.length; i++){
                    addemployArr.push(rows[i].title.value = rows[i].id)
                    console.table(rows[i].id + " "+ rows[i].title)
                }
                return addemployArr
            },
        },
        {
            type: 'number',
            name: 'employ_manager',
            message: 'Please enter employee manager id',
            default: 'NULL'
        },
    ]
    console.table(rows)
    inquirer
    .prompt(questions)
    .then(data=>{
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.employ_Fname}', '${data.employ_Lname}', ${data.employ_role} ,${data.employ_manager})`)
        menu()
    })
})
}

const updateEmployee = ()=>{
    db.query(`SELECT * FROM roles`, (err,rows)=>{
    db.query(`SELECT * FROM employee`, (err,results)=>{
console.table(results)
    const questions = [
        {
            type: 'text',
            name: 'employ_list',
            message: 'Please enter employee first name',
            choices: function(){
                let employArr = [];;
                for(i=0; i < rows.length; i++){
                    employArr.push(rows[i].id)
                }
            },
        },

        {
            
            type: 'list',
            name: 'employ_role',
            message: 'Please select the ID that matches the role you want',
            choices: function(){
                let employArr = [];;
                for(i=0; i < rows.length; i++){
                    employArr.push(rows[i].id)
                    console.log( "ID "+ rows[i].id +" " + rows[i].title)
                   
                }
                return employArr
            },
        }
    ]
    inquirer
    .prompt(questions)
.then(data =>{
    console.log(data.employ_role)
    db.query(`UPDATE employee SET role_id = '${data.employ_role}' WHERE first_name = '${data.employ_list}'`)
    menu()
})
    })
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