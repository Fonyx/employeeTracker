-- insert departments
INSERT INTO department(name)
VALUES
('Marketing'),
('Engineering'),
('HR'),
('Logistics');


-- insert roles
INSERT INTO role(title, salary, department_id)
VALUES
-- marketing
('Chief Marketing Officer', 130000, 1),
('Brand Specialist', 100000, 1),
('Client Specialist', 80000, 1),
('Intern Marketer', 45000, 1),
-- Engineering
('Chief Engineering Officer', 180000, 2),
('Electrical Engineer', 140000, 2),
('Mechanical Engineer', 130000, 2),
('Intern Engineer', 90000, 2),
-- HR
('Chief Managemement Officer', 100000, 3),
('Department Liason', 850000, 3),
('Psychologist', 75000, 3),
('Intern Manager', 45000, 3),
-- Logistics
('Chief Logistics Officer', 130000, 4),
('IT Service Agent', 110000, 4),
('Ordering Specialist', 100000, 4),
('Intern', 45000, 4);

-- insert head employee
INSERT INTO employee(first_name, last_name, role_id) VALUES
('James', 'Smith', 1);


-- insert remaining employees
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('Hoth', 'Aier', 2, 1),
('Jane', 'Doe', 3, 1),
('Ellen', 'Ran', 4, 1),
('Mark', 'Dong', 5, 1),
('Sharathra', 'Stelian', 6, 5),
('Jayamani', 'Inga', 7, 5),
('Vijeta', 'Gojira', 8, 5),
('Hassan', 'Modou', 9, 1),
('Jeremy', 'Walker', 10, 9),
('Tjart', 'Samir', 11, 9),
('Cowessess', 'Simeon', 12, 9),
('Dionysios', 'Aviyah', 13, 1),
('Hanna', 'Anakletos', 14, 13),
('Gigi', 'Iris', 15, 13),
('Loral', 'denege', 16, 13);