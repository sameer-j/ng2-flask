from flask import Flask, send_from_directory, request, redirect, url_for
import os
import subprocess
app = Flask(__name__)

BASE_URL = os.path.abspath(os.path.dirname(__file__))
CLIENT_APP_FOLDER = os.path.join(BASE_URL, "ClientApp")

#---only for development time----
#typescript compiler watch changes in input file and convert to js
subprocess.Popen('tsc -w', cwd=os.path.join(CLIENT_APP_FOLDER, "app"), shell=True)
#-----


@app.route('/', defaults={'path': ''}) #Catch All urls, enabling copy-paste url
@app.route('/<path:path>') #Catch All urls, enabling copy-paste url
def home(path):
	return send_from_directory(CLIENT_APP_FOLDER, 'index.html')

@app.route('/client-app/<path:filename>')
def client_app_folder(filename):
	return send_from_directory(CLIENT_APP_FOLDER, filename)

@app.route('/app/<path:filename>')
def client_app_app_folder(filename):
	return send_from_directory(os.path.join(CLIENT_APP_FOLDER, "app"), filename)

if __name__ == "__main__":
    app.run(debug=True)