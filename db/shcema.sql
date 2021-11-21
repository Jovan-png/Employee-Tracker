DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER
  FOREIGN KEY (id)
  REFERENCES employee(id)
);
CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
    FOREIGN KEY (id)
    REFERENCES employee(role_id)
);
CREATE TABLE department (
    id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
    FOREIGN KEY (id)
    REFERENCES roles(department_id)
);
