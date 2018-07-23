from flask import Flask, render_template, jsonify
import fsite_index

app = Flask(__name__,
            static_folder="./dist/static",
            template_folder="./dist")


@app.route('/')
def hello_world():
    return render_template("fsite-index/index.html")


@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify({
        'projects': fsite_index.collect_data(
            fsite_index.projects_names()
        )
    })


@app.route('/fsite-simple-landing/')
def fsite_simple_landing():
    return render_template("fsite-simple-landing/index.html")


@app.route('/bs01/')
def index():
    return render_template("bs01/index.html")

if __name__ == '__main__':
    app.run(debug=True)