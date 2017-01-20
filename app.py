from flask import Flask, send_from_directory, request, redirect, url_for
from flask import jsonify
import os
import subprocess
from in_memory_db import IMDB
app = Flask(__name__)
imdb = IMDB()
BASE_URL = os.path.abspath(os.path.dirname(__file__))
CLIENT_APP_FOLDER = os.path.join(BASE_URL, "ClientApp")

#---only for development time----
#typescript compiler watch changes in input file and convert to js
subprocess.Popen('tsc -w', cwd=os.path.join(CLIENT_APP_FOLDER, "app"), shell=True)
#-----

@app.route('/api/heroes', methods=['GET'])
def getAllHeroes():
	return jsonify({'data':imdb.getAllHeroes()})

@app.route('/api/heroes/<int:heroId>', methods=['GET'])
def getHero(heroId):
	return jsonify({'data':imdb.getHero(heroId)})

@app.route('/api/heroes/<int:heroId>', methods=['PUT'])
def updateHero(heroId):
	return jsonify({'data':imdb.updateHero(heroId, request.json)})

@app.route('/api/heroes', methods=['POST'])
def createHero():
	return jsonify({'data':imdb.createHero(request.json)})

@app.route('/api/heroes/<int:id>', methods=['DELETE'])
def deleteHero(id):
	imdb.deleteHero(id)
	return 'success'

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