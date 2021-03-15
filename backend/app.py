from transformers import DistilBertTokenizer, DistilBertForQuestionAnswering
import torch
from flask import Flask, request, jsonify
from os import environ
from sys import argv as args

from answer import answer

try:
	PORT = int(environ.get('PORT'))
except:
	PORT = 5000
app = Flask(__name__)

@app.errorhandler(400)
def bad_request(*args, **kwargs):
	return 'Only JSON request body allowed.', 400

@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'GET':
		return 'OK'
	else:
		props = ('context', 'question')
		if request.content_type != 'application/json':
			return 'Only JSON request body allowed.'
		if request.json is None:
			return 'JSON request body required.', 400
		for prop in props:
			if prop not in request.json or request.json.get(prop) is not str:
				return f'{prop.capitalize()} not specified.', 400
		context, question = request.json.get('context'), request.json.get('question')
		try:
			return answer(context=context, question=question)
		except:
			return None

if __name__ == '__main__':
	debug = False
	if len(args) > 1 and args[1].lower() == 'debug':
		debug = True
	app.run(port=PORT, debug=debug)