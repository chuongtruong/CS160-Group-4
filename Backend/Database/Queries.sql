USE Test_DB;

DROP TABLE IF EXISTS hash_algorithms;
CREATE TABLE hash_algorithms (hash_ID int not null primary key auto_increment,
algorithm_name varchar(40));

DROP TABLE IF EXISTS user_login_data;
CREATE TABLE user_login_data (ID int not null primary key auto_increment, 
user_name varchar(40), user_password_hash varchar(250),
user_password_salt varchar(100), foreign key (hash_id) references hash_algorithms(hash_ID),
hash_id int not null, login_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, counter int);


CREATE TABLE Items (
    ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    item_name varchar(256),
    item_description varchar(256),
    item_price float,
    item_quantity int
);

DROP TABLE IF EXISTS Items;
-- -- I can't created Table "Table since "Table" is a reserved word.
-- -- I created a table called "Restaurant_table"
DROP TABLE IF EXISTS Restaurant_Table;
CREATE TABLE Restaurant_Table (
	ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    table_number int UNIQUE
);

DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
	ID int PRIMARY KEY AUTO_INCREMENT,
	table_ID int NOT NULL,
    item_ID int NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id int not null,
    foreign key (user_id) references User_login_data(ID)
);

-- TEST QUERIES

INSERT INTO Items(item_name, item_description, item_price, item_quantity)
VALUES
	("Hawaii Pizza", "This is Hawaii Pizza", 9.99, 10),
    ("Chicago Pizza", "This is Chicago Pizza", 19.99, 20),
    ("New York Pizza", "This is New York Pizza", 29.99, 30),
    ("California Pizza", "This is Califorinia Pizza", 39.99, 40)
;

INSERT INTO Restaurant_table(table_number)
VALUES
	(1),
    (2),
    (3),
    (4)
;

INSERT INTO Orders(table_ID, item_ID, user_id)
VALUES
	(1,2, 1),
    (1,1, 1),
    (2,3, 1),
    (2,1, 1),
    (2,1, 1),
    (2,2, 1),
    (3,1, 1),
    (4,2, 1)
;

INSERT INTO user_login_data (user_name, user_password_hash, user_password_salt, hash_id, counter)
VALUES
("Cody", "some_hash_code1", "pseudorandom_string1", 1, 0), 
("Chuong", "some_hash_code2", "pseudorandom_string2", 1, 0), 
("Gabby", "some_hash_code3", "pseudorandom_string3", 2, 0)
;

INSERT INTO hash_algorithms (algorithm_name)
VALUES
("SHA-2"),
("SHA-3");

-- SELECT * FROM Items;
-- SELECT * FROM Restaurant_table;
-- SELECT * FROM Orders;

-- SELECT ALL ITEMS ORDERED BY TABLE 1
SELECT
	O.ID,
	I.item_name, 
    table_number,
    created_at
FROM 
	Items as I, 
    Restaurant_table as R, 
    Orders as O
WHERE 
	I.ID = O.item_ID 
    AND
    R.ID = O.table_ID
    AND
    R.table_number = 1
;
-- SELECT ALL ITEMS ORDERED BY TABLE 1 WITH USER ID

SELECT
	U.ID,
	O.ID,
	I.item_name, 
    table_number,
    created_at
FROM 
	user_login_data as U,
	Items as I, 
    Restaurant_table as R, 
    Orders as O
WHERE 
	U.ID = O.user_id
    AND
	I.ID = O.item_ID 
    AND
    R.ID = O.table_ID
    AND
    R.table_number = 1
    