from flask import Flask, render_template, redirect, url_for, request, abort, session

app = Flask(__name__)

@app.route("/")
def default():
    return render_template("main_page.html", reference_to_details_page = url_for("christmas_story"))

@app.route("/christmas_story/")
def christmas_story():
    return render_template("christmas_story.html", reference_to_buying_page = url_for("buy_tickets", play_name = "christmas_story"))

@app.route("/buy_tickets/<play_name>", methods=["post"])
def buy_tickets(play_name):
    play_name = str(play_name)
    return render_template("buy_tickets.html", play_name=play_name, refrence_to_transaction_page = url_for("transaction_page", play_name=play_name)) # your code here

@app.route("/transaction_page/<play_name>", methods=["post"])
def transaction_page(play_name):


    # order_items_in_String_format = request.form["transaction_page"].strip()
    # order_items_in_array_format = order_items_in_String_format.split("\n")
    # customer = request.form["transaction_page"]
    # global order_number
    # order_number = order_number + 1

    

    # #  Gather form data into a JSON object
    # const formData = {
    #     zone: document.getElementById("zone").value,
    #     sector: document.getElementById("sector").value,
    #     customer_name: document.getElementById("customer_name").value,
    #     date_and_time: document.getElementById("date_and_time").value,
    # }

    # data = request.get_json()
    
    # # Extract individual fields
    zone = request.form["zone"]
    sector = request.form["sector"]
    customer_name = request.form["customer_name"]
    date_and_time = request.form["date_and_time"]

    current_transaction = {
        "zone": zone,
        "sector": sector,
        "customer_name": customer_name,
        "date_and_time": date_and_time
    }

    return render_template("transaction_page.html", play_name=play_name, transaction = current_transaction, reference_to_main_page = url_for("default")) # your code here

if __name__ == "__main__":
    app.run(debug=True)