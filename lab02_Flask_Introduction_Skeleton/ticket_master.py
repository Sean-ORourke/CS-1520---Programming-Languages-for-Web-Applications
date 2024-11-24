from flask import Flask, render_template, redirect, url_for, request, abort, session

app = Flask(__name__)

@app.route("/")
def default():
    return render_template("main_page.html", reference_to_details_page = url_for("christmas_story"))


# https://youtu.be/pfpWasQvBfg?si=A9NU5JXpBOFVPdBF&t=37 "you do not need to have the functionality for the other 5, just pay attetion on this one here"
@app.route("/christmas_story/")
def christmas_story(): 
    return render_template("christmas_story.html", reference_to_buying_page = url_for("buy_tickets", play_name = "christmas_story"))

@app.route("/buy_tickets/<play_name>", methods=["post"])
def buy_tickets(play_name):
    play_name = str(play_name)
    return render_template("buy_tickets.html", play_name=play_name, refrence_to_transaction_page = url_for("transaction_page", play_name=play_name))

@app.route("/transaction_page/<play_name>", methods=["post"])
def transaction_page(play_name):
    
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

    return render_template("transaction_page.html", play_name=play_name, transaction = current_transaction, reference_to_main_page = url_for("default"))

if __name__ == "__main__":
    app.run(debug=True)