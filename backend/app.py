from flask import Flask, request, jsonify
from flask_cors import CORS
from os import environ
from sys import argv as args

from answer import answer

try:
	PORT = int(environ.get('PORT'))
except:
	PORT = 5000
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'GET':
		return 'OK'
	else:
		props = ('context', 'question')
		if request.content_type.split(';')[0] != 'application/json':
			return 'Only JSON request body allowed.', 400
		if request.json is None:
			return 'JSON request body required.', 400
		for prop in props:
			if prop not in request.json or type(request.json.get(prop)) is not str:
				return f'{prop.capitalize()} not specified.', 400
		context, question = request.json.get('context'), request.json.get('question')
		try:
			return jsonify(answer(context=context, question=question))
		except Exception as e:
			print('Error:', e)
			return jsonify(None)

if __name__ == '__main__':
	debug = False
	if len(args) > 1 and args[1].lower() == 'debug':
		debug = True
	app.run(port=PORT, debug=debug)