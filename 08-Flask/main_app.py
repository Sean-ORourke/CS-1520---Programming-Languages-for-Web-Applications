from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World - version 2"

@app.route("/foo")
def foo_controller():
    return "<h1>This is the foo page</h1><img src='https://media.istockphoto.com/id/1349297974/photo/multi-ethnic-group-of-latin-american-college-students-smiling.jpg?s=1024x1024&w=is&k=20&c=6OJcxH8z1jE8Yp_PaJmqoBVW-IOksNFzbxXkCYSLDJI='>"

@app.route("/bar/")
def bar_controller():
    return """<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Info</title>
</head>
<body>
    <h1>Head First Design Patterns:</h1>
    <h2>A Brain-Friendly Guide</h2>
    <img src="https://m.media-amazon.com/images/I/91bobQSPQrL._SL1500_.jpg" width="40%" alt="">
    <p style="width:50%">
        At any given moment, someone struggles with the same software design problems you have. 
        And, chances are, someone else has already solved your problem. This edition of Head 
        First Design Patterns―now updated for Java 8―shows you the tried-and-true, road-tested 
        patterns used by developers to create functional, elegant, reusable, and flexible 
        software. By the time you finish this book, you’ll be able to take advantage of the 
        best design practices and experiences of those who have fought the beast of software 
        design and triumphed.
    </p>

    <h2>Editorial Reviews</h2>
    <h3>About the Author</h3>
    <p style="width:50%">
        Eric Freeman recently ended nearly a decade as a media company executive, 
        having held the position of CTO of Disney Online & Disney.com at The Walt 
        Disney Company. Eric is now devoting his time to WickedlySmart.com and 
        lives with his wife and young daughter in Austin, TX. He holds a Ph.D. in 
        Computer Science from Yale University.
    </p>
    <p style="width:50%">
        Elisabeth Robson is co-founder of Wickedly Smart, an education company 
        devoted to helping customers gain mastery in web technologies. She's 
        co-author of four bestselling books, Head First Design Patterns, Head 
        First HTML and CSS, Head First HTML5 Programming, and Head First 
        JavaScript Programming.
    </p>
</body>
</html> """

if __name__ == "__main__":
    app.run()