INSERT INTO department (name) VALUE ('Tech');
INSERT INTO department (name) VALUE ('Finance');
INSERT INTO department (name) VALUE ('Hospitality');
INSERT INTO department (name) VALUE ('Arts');
INSERT INTO department (name) VALUE ('Exploration');

INSERT INTO role (title, salary, department_id) VALUES ('Wizard', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Banker', 20000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Stuard', 300, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Bard', 40000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Traveler', 500, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Steve', 'Rogers', NULL, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Tony', 'Stark', NULL, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Bruce', 'Banner', NULL, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Jarvis', 'Vision', 2, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Nat', 'Rom', NULL, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Frank', 'Castle', 1, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Peter', 'Quill', 3, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Thor', 'Odinson', 4, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Clint', 'Barton', 3, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Nick', 'Fury', 1, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('Wanda', 'Maximoff', NULL, 3);