USE emp_mgt_db;

INSERT INTO issues (employee_id,issue_short_descr,issue_date,issue_full_descr,createdAt,updatedAt,EmployeeId)
VALUES("1","mike was late","2020-03-14","mike was late for the 10th time in three months",curdate(),curdate(),"1"); 

INSERT INTO issues (employee_id,issue_short_descr,issue_date,issue_full_descr,createdAt,updatedAt,EmployeeId)
VALUES("1","mike ate someone's lunch","2020-03-14","caught red handed with the sandiwhc",curdate(),curdate(),"1"); 

INSERT INTO issues (employee_id,issue_short_descr,issue_date,issue_full_descr,createdAt,updatedAt,EmployeeId)
VALUES("2","kurt called someone a bad name","2020-03-14","kurt was very mean to brandon",curdate(),curdate(),"2"); 

INSERT INTO issues (employee_id,issue_short_descr,issue_date,issue_full_descr,createdAt,updatedAt,EmployeeId)
VALUES("2","kurt called someone a bad name","2020-03-14","kurt was very mean to brandon",curdate(),curdate(),"2"); 

INSERT INTO employees (emp_fname,emp_lname,emp_email,emp_pay,emp_hire_date,emp_photo,createdAt,updatedAt)  
VALUES("First","Last","bob@HR.com",500000,"1991-11-09","no_image.png",curdate(),curdate());

INSERT INTO employees (emp_fname,emp_lname,emp_email,emp_pay,emp_hire_date,emp_photo,createdAt,updatedAt)  
VALUES("Ryan","Moore","ryanmoore@gmail.com",60000,"2005-11-15","no_image.png",curdate(),curdate());

INSERT INTO employees (emp_fname,emp_lname,emp_email,emp_pay,emp_hire_date,emp_photo,createdAt,updatedAt)  
VALUES("Laura","Aikers","Aikers45@yahoo.com",1500,"2010-06-03","no_image.png",curdate(),curdate());
