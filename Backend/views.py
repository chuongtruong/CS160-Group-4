from unicodedata import category
from flask import Flask, render_template, request, jsonify, abort
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
            SELECT 
                I.item_name,
                I.item_description,
                I.item_price,
                I.item_quantity,
                I.calories,
                P.url,
                C.name
            FROM Items I
            JOIN Photos P ON I.photoID=P.ID
            JOIN Categories C ON I.categoryID=C.ID
            ;
        """

        cur.execute(querry)
        result = cur.fetchall()
        # print(result)
        json_data = []
        print(len(result[0]))
        for i in result:
            print(i)
            item = {
                'name':i[0],
                'desc':i[1],
                'price':i[2],
                'quantity':i[3],
                'calories':i[4],
                'url':i[5],
                'category':i[6]
            }

            json_data.append(item)
        return jsonify(json_data)
    
    #Create an order
    @app.route('/t=<table_no>/create', methods=['GET','POST'])
    def createOrder(table_no):
        if not table_no:
            return abort(404, description="Invalid table")

        cur = mysql.connection.cursor()

        table_detail_querry = f"""
            SELECT status
            FROM Restaurant_Table
            WHERE table_number = {int(table_no)}
        """ 
        print(table_detail_querry)
        cur.execute(table_detail_querry)
        table_status = cur.fetchall()[0][0] #statu 0: empty, 1: occupied
        if table_status == 1:
            return abort(404, description="The current table is occupied. Please select another table.")
        
        # # if result_table_detail

        # # TODO: There can be error if table_no is invalid

        if request.method == 'POST':
            # https://dev.to/dev_elie/sending-data-from-react-to-flask-apm
            
            '''
                frontend will send a object looks like
                {
                    "item_id": [item_id, item_id,...],
                    "item_title: [item_title, item_title,...]"
                    "quantity": [1,3,....]
                }
            '''

            try:
                item_id_list = request.json('item_id')
                item_title_list = request.json('item_title')
                quantity_list = request.json('quantity')                
                create_order_querry = """
                    INSERT INTO Orders(table)
                    VALUE
                """
                for item_id, item_title,quantity in zip(item_id_list, item_title_list, quantity_list):
                    tmp_sub_querry = f'(item_id,item_title,quanity),'
                    create_order_querry += tmp_sub_querry
                
                create_order_querry

            except Exception:
                return abort(404, description='Error')