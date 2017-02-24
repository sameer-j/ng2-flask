from flask import Flask, send_from_directory, request, redirect, url_for, g
from flask import jsonify, render_template, abort
import os, json
import subprocess
from in_memory_db import IMDB
from User import User, UserActions
from functools import wraps

app = Flask(__name__)
app.secret_key = 'super secret key'
imdb = IMDB()
BASE_URL = os.path.abspath(os.path.dirname(__file__))
CLIENT_APP_FOLDER = os.path.join(BASE_URL, "ClientApp")

#---only for development time----
#typescript compiler watch changes in input file and convert to js
subprocess.Popen('tsc -w', cwd=os.path.join(CLIENT_APP_FOLDER, "app"), shell=True)
#-----

def login_required(api_method):
	@wraps(api_method)

	def check_login(*args, **kwargs):
		print(request)
		userid = request.headers.get('Authorization')
		print('here1',userid)
		if userid:
			userid = userid.replace('Bearer ','', 1)
			try:
				print('here2')
				userid = User.decode_auth_token(userid)
				print('here3',userid)
			except Exception as e:
				print('here4')
				print(e)
				abort(401)
			if userid:
				return api_method(*args, **kwargs)
		print('here?')
		abort(401)

	return check_login

@app.route('/api/login',methods=['POST'])
def login():
	username = request.json['uname']
	password = request.json['pwd']
	registered_user = UserActions.getUser(username=username,password=password)
	
	if registered_user:
		auth_token = registered_user.encode_auth_token(registered_user.id)
		if auth_token:
			responseObject = {
			'status': 'success',
			'message': 'Successfully logged in',
			'user': json.dumps(registered_user.__dict__),
			'token': auth_token
			}
			return jsonify(responseObject)
	else:
		responseObject = {
		'status': 'fail',
		'message': 'Invalid credentials'
		}	
		return jsonify(responseObject)

@app.route('/api/heroes', methods=['GET'])
@login_required
def getAllHeroes():
	return jsonify({'data':imdb.getAllHeroes()})

@app.route('/api/heroes/<int:heroId>', methods=['GET'])
@login_required
def getHero(heroId):
	return jsonify({'data':imdb.getHero(heroId)})

@app.route('/api/heroes/<int:heroId>', methods=['PUT'])
@login_required
def updateHero(heroId):
	return jsonify({'data':imdb.updateHero(heroId, request.json)})

@app.route('/api/heroes', methods=['POST'])
@login_required
def createHero():
	return jsonify({'data':imdb.createHero(request.json)})

@app.route('/api/heroes/<int:id>', methods=['DELETE'])
@login_required
def deleteHero(id):
	imdb.deleteHero(id)
	return 'success'

@app.route('/api/heroes/', methods=['GET'])
@login_required
def searchHero():
	return jsonify({'data':imdb.searchHero(request.args)})

#-----File server


@app.route('/', defaults={'path': ''}) #Catch All urls, enabling copy-paste url
@app.route('/<path:path>') #Catch All urls, enabling copy-paste url
def home(path):
	print('here: %s' % path)
	return send_from_directory(CLIENT_APP_FOLDER, 'index.html')

@app.route('/client-app/<path:filename>')
def client_app_folder(filename):
	return send_from_directory(CLIENT_APP_FOLDER, filename)

@app.route('/app/<path:filename>')
def client_app_app_folder(filename):
	return send_from_directory(os.path.join(CLIENT_APP_FOLDER, "app"), filename)

if __name__ == "__main__":
	app.run(debug=True)