from app_models import MODEL_PATH, ensure_models
from transformers import DistilBertForQuestionAnswering, DistilBertTokenizer
from numpy import inf as INFINITY
from torch import tensor, argmax

ensure_models()

model = DistilBertForQuestionAnswering.from_pretrained(MODEL_PATH)

# Encode input
def encode(context: str, question: str, tokenizer: DistilBertTokenizer):
	encoded = tokenizer.encode_plus(question, context, max_length=512)

	input_ids = encoded['input_ids']
	input_mask = encoded['attention_mask'] # Boolean mask for differentiating context and question

	return input_ids, input_mask

# Get answer tokens
def get_answer_tokens(input_ids: list, input_mask: list, tokenizer: DistilBertTokenizer):
	# Get start scores and end scores
	start_scores, end_scores = model(
		tensor([input_ids]),
		attention_mask=tensor([input_mask])
	)

	answer_token_ids = input_ids[
		argmax(start_scores):argmax(end_scores)
	]
	answer_tokens = tokenizer.convert_ids_to_tokens(answer_token_ids, skip_special_tokens=True)
	
	return answer_tokens

def answer(context: str, question: str):
	tokenizer: DistilBertTokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH, return_token_type_ids = True)
	input_ids, input_mask = encode(context, question, tokenizer)
	answer_tokens = get_answer_tokens(input_ids, input_mask, tokenizer)

	answer = tokenizer.convert_tokens_to_string(answer_tokens)

	if answer.strip() == '':
		return ''

	return answer.replace(' , ', ', ').strip().rstrip(',').strip().capitalize() + '.'