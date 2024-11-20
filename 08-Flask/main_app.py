from flask import Flask, render_template, redirect, url_for, request, abort, session

app = Flask(__name__)

users = {"alice":"qwert", "bob":"asdfg", "charlie":"zxcvb"}

app.secret_key = "this is a secret key"

@app.route("/")
def default():
    return redirect(url_for("login_controller"))

@app.route("/login", methods=["GET", "POST"])
def login_controller():

    if "username" in session: 
        return redirect(url_for("profile", username1=session["username"]))

    # process HTTP GET requests
    if request.method == "GET": 
        return render_template("login.html")

    # process HTTP POST requests
    elif request.method == "POST":
        entered_username = request.form["user"]
        # checking if the user is in the users fake database
        if entered_username in users:
            # checking if the right password has been entered
            entered_password = request.form["pass"]
            database_password = users[entered_username]
            if entered_password == database_password:
                # redirect the user to his/her profile page
                session["username"] = request.form["user"]
                return redirect(url_for("profile", username1=entered_username))
            
            else:
                # wrong password
                print("Login route: POST Request: wrong password: aborting process...")
                abort(401)
        else:
            # wrong username
            print("Login route: POST request: user is not registered in the database: Aborting process...")
            abort(404)

@app.route("/profile/<username1>")
def profile(username1):
    if "username" in session:
        return render_template("current_profile.html", username=username1, reference_to_logout_page = url_for("unlogger"))
    else:
        return render_template("login.html")

@app.route("/logout")
def unlogger():
    if "username" in session:
        session.clear()
        return render_template("logout.html")
    else:
        return redirect(url_for("login_controller"))

if __name__ == "__main__":
    app.run(debug=True)