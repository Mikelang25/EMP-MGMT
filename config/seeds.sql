CREATE DATABASE emp_mgt_db;
USE emp_mgt_db;

INSERT INTO employees (emp_fname,emp_lname,emp_email,emp_pay,emp_hire_date,emp_photo,createdAt,updatedAt)  
VALUES("First","Last","bob@HR.com",500000,"1991-11-09","no_image.png",curdate(),curdate());

INSERT INTO employees (emp_fname,emp_lname,emp_email,emp_pay,emp_hire_date,emp_photo,createdAt,updatedAt)  
VALUES("Ryan","Moore","ryanmoore@gmail.com",60000,"2005-11-15","no_image.png",curdate(),curdate());

INSERT INTO employees (emp_fname,emp_lname,emp_email,emp_pay,emp_hire_date,emp_photo,createdAt,updatedAt)  
VALUES("Laura","Aikers","Aikers45@yahoo.com",1500,"2010-06-03","no_image.png",curdate(),curdate());
