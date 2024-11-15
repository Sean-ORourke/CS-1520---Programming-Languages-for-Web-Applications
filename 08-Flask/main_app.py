from flask import Flask, render_template, redirect, url_for, request, abort

app = Flask(__name__)

users = {"alice:qwert", ":"}

@app.route("/")
def default():
    return redirect(url_for("login_controller"))

@app.route("/login", methods=["GET", "POST"])
def login_controller():
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
                return redirect(url_for("profile"))
            else:
                # wrong password
                print("Login route: POST Request: wrong password: aborting process...")
                abort(401)
        else:
            # wrong username
            print("Login route: POST request: user is not registered in the database: Aborting process...")
            abort(404)

@app.route("/profile")
def profile():
    return render_template("current_profile.html")

if __name__ == "__main__":
    app.run(debug=True)