# app.py
from flask import Flask, render_template, request, url_for, abort, redirect
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


app = Flask(__name__)

@app.route("/")
def index():
    return "<h1>Type in '/7' !</h1>"

@app.route("/7")
def main():
    return render_template("main_menu.html", order_summary_ref=url_for("order_summary"))

@app.route("/order_summary/7", methods=["POST"], table = table)
def order_summary():
    # "2 Baked Apple (s) $5.00 \n 1 Chocolate Chips Cookie(s) $2.50"
    # orders = request.form["order_summary"]
    # customer_name = request.form["customer"]
    # global order_number
    # order_number = order_number + 1

    # # creating an Order object to be saved into the database
    # new_order = Order(customer_name=customer_name, 
    #                   orders=orders.strip(), 
    #                   order_number=order_number)
    
    # new_order_in_JSON_format = new_order.toJSON()

    # try:
    #     session.add(new_order)
    #     session.commit()
    #     return render_template("order_summary.html", order=new_order_in_JSON_format)
    # except:
    #     return 'There was an issue adding your task'
    # return render_template("order_summary.html")

if __name__ == "__main__":
    app.run(debug=True)