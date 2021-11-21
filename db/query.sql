SELECT  employee.first_name, employee.last_name, roles.id
FROM employee AS p  
LEFT JOIN roles AS role  
ON employee.role_id = roles.id
LEFT JOIN department 
ON employee.manager_id = department