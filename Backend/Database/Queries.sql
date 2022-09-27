USE Test_DB;

DROP TABLE IF EXISTS Items;
CREATE TABLE Items (
    ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    item_name varchar(256),
    item_description varchar(256),
    item_price float,
    item_quantity int
);

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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

INSERT INTO Orders(table_ID, item_ID)
VALUES
	(1,2),
    (1,1),
    (2,3),
    (2,1),
    (2,1),
    (2,2),
    (3,1),
    (4,2)
;
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


    