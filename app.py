from flask import Flask, send_from_directory
import os

app = Flask(_name_)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

if _name_ == '_main_':
    print("🎂 Төрсөн өдрийн вэб апп ажиллаж байна: http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
