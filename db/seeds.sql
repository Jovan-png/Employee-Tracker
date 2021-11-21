
INSERT INTO department(id,name)
VALUES
(3,'Main'),
(2,'Second')
;
  
INSERT INTO roles (id, title, salary, department_id)
VALUES
(10, 'Senior Developer', 80000, 3),
(15, 'Junior Developer', 60000, 2),
(20, 'Intern ', 40000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 10 ,NULL),
  ('Virginia', 'Woolf', 15 ,1),
  ('Piers', 'Gaveston', 10,1),
  ('Charles', 'LeRoi', 15,1),
  ('Katherine', 'Mansfield', 15,NULL),
  ('Dora', 'Carrington', 20,5),
  ('Edward', 'Bellamy', 10,5),
  ('Montague', 'Summers', 15,5),
  ('Octavia', 'Butler', 15,5),
  ('Unica', 'Zurn', 15,5)
  ;
