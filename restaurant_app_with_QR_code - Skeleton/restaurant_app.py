from flask import Flask, render_template, request, url_for, abort, redirect
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from order_model import Base, Order


app = Flask(__name__)

engine = create_engine("sqlite:///orders.db", echo=True)
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

@app.route("/")
def index():
    return "<h1>Type in '/7' !</h1>"

@app.route("/7")
def main():
    return render_template("main_menu.html", order_summary_ref=url_for("order_summary", table_number = 7))

@app.route("/order_summary/<int:table_number>", methods=["POST"])
def order_summary(table_number):

    #<h2>Customer Name: </h2>
    # <h3>Table Number: </h3>
    # <h3>Order Summary:</h3>
    # table_number
    # "2 Baked Apple (s) $5.00 \n 1 Chocolate Chips Cookie(s) $2.50"
    order_summary = request.form["order_summary"]
    customer_name = request.form["customer_name"]
    # global table_number
    # table_number = {table_number}

    # creating an Order object to be saved into the database
    print("new_order")
    new_order = Order(customer_name=customer_name, 
                      orders=order_summary.strip().replace('\r', ''), 
                      order_number=table_number)
    
    new_order_in_JSON_format = new_order.toJSON()

    try:
        session.add(new_order)
        session.commit()
        return render_template("order_summary.html", order=new_order_in_JSON_format)
    except:
        return 'There was an issue adding your task'
    return render_template("order_summary.html")

if __name__ == "__main__":
    app.run(debug=True)