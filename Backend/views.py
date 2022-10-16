from unicodedata import category
from flask import Flask, render_template, request
import json

def init(app, mysql):
    @app.route('/', methods=['GET', 'POST'])
    def index():
        if request.method == 'POST':
            # Fetch Form Data
            user_details = request.form
            employee_id = user_details['Employee ID Number']
            password = user_details['Password']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO users(employeeID, password) VALUES(%s,%s)",
                        (employee_id, password))

            mysql.connection.commit()
            cur.close()
            return 'success'
        return render_template('index.html')

    @app.route('/users')
    def users():
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users")
        if result > 0:
            user_details = cur.fetchall();
            return render_template('users.html', user_details=user_details)

    # Get all categories
    @app.route('/categories', methods=['GET'])
    def getAllCategories():
        cur = mysql.connection.cursor()
        querry = "SELECT * FROM Categories"
        cur.execute(querry)
        result = cur.fetchall()
        json_data = []
        for _,categories_name in result:
            json_data.append(categories_name)
        return json.dumps(json_data)
    
    # Get all tables, isOccupied = 1 means True, isOccupied = 0 means False
    @app.route('/tables/', defaults={'isOccupied': 2}, methods=['GET'])
    @app.route('/tables/<isOccupied>', methods=['GET'])
    def getAllTables(isOccupied):
        cur = mysql.connection.cursor()
        querry = """
            SELECT * 
            FROM Restaurant_Table 
            """
        print(isOccupied)
        if isOccupied == "1":
            querry += "WHERE status = 1;"
        elif isOccupied == "0":
            querry += "WHERE status = 0;"
        else:
            querry += ";"
            
        print("QUERRY: ", querry)

        cur.execute(querry)
        result = cur.fetchall()
        json_data = []
        for _,table_number,status in result:
            json_data.append({
                'table_number': table_number,
                'status': status 
            })
        return json.dumps(json_data)

    # Get all items from Items table
    @app.route('/menu', methods=['GET'])
    def getAllItems():
        cur = mysql.connection.cursor()
        querry = """
            SELECT I.*, P.photo
            FROM Items I
            JOIN Photos P
            ON I.photoID=P.ID
            ;
        """
        print(querry)
        cur.execute(querry)
        result = cur.fetchall()
        json_data = []
        for i in result:
            json_data.append(i[1])
        return json.dumps(json_data)
    
    #Create an order
    

