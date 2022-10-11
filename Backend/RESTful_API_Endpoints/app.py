from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

with open('db.yaml', 'r') as file:
    db = yaml.safe_load(file)
# db = yaml.load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)


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

if __name__ == '__main__':
    app.run(debug=True)
