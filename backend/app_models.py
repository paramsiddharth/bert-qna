from transformers import DistilBertTokenizer, DistilBertForQuestionAnswering
import torch
from os import path, getcwd, makedirs
from pathlib import Path
from shutil import rmtree

MODEL_PATH = path.join(getcwd(), 'models')

def ensure_models():
	try:
		tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH, return_token_type_ids = True)
		model = DistilBertForQuestionAnswering.from_pretrained(MODEL_PATH)
	except:
		if Path(MODEL_PATH).is_dir():
			rmtree(MODEL_PATH)
		makedirs(MODEL_PATH)
		tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased', return_token_type_ids = True)
		tokenizer.save_pretrained(MODEL_PATH)
		model = DistilBertForQuestionAnswering.from_pretrained('distilbert-base-uncased-distilled-squad')
		model.save_pretrained(MODEL_PATH)