from app_models import MODEL_PATH, ensure_models
from transformers import DistilBertForQuestionAnswering, DistilBertTokenizer
from numpy import inf as INFINITY
from torch import tensor, argmax

ensure_models()

model = DistilBertForQuestionAnswering.from_pretrained(MODEL_PATH)

'''
# # Separate question and context
# def separate_question_and_context(input_ids: list, tokenizer: AutoTokenizer):
# 	# The context begins right after this index
# 	sep_index = input_ids.index(tokenizer.sep_token_id)

# 	# Boolean mask for differentiating context and question
# 	segment_ids = (
# 		'0' * (sep_index + 1)
# 		+ '1' * (len(input_ids) - sep_index - 1)
# 	).split('')

# 	return segment_ids

# # Preprocessing
# def preprocessing(context: str, question: str):
# 	# Load tokenizer
# 	tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

# 	# Encode input
# 	input_ids = tokenizer.encode(question, context)

# 	# Get mask
# 	input_type_ids = separate_question_and_context(input_ids, tokenizer)

# 	return {
# 		'input_ids': input_ids,
# 		'input_mask': input_type_ids,
# 		'tokens': tokenizer.convert_ids_to_tokens(input_ids)
# 	}

# # Construct answer
# def construct_answer(tokens: list):
# 	# Iterate through tokens
# 	for i, token in enumerate(tokens):
# 		if i == 0:
# 			string = token
# 		else:
# 			# Append subwords directly
# 			if token[0] == '#':
# 				string += token.replace('##', '')
# 			else:
# 				string += ' ' + token
	
# 	return string.strip()

# # Get answer
# def answer(context: str, question: str):
# 	return 'Default answer'
	
# 	preprocessed_output = preprocessing(context, question)

# 	bert_input = [
# 		preprocessed_output['input_ids'],
# 		preprocessed_output['input_mask']
# 	]

# 	decoded_ids = preprocessed_output['tokens']

# 	start_pos, stop_pos = 

# 	best_start = -1
# 	best_stop = -1
# 	max_sum = -INFINITY

# 	for start in range(len()):
# 		...
'''

# Encode input
def encode(context: str, question: str, tokenizer: DistilBertTokenizer):
	encoded = tokenizer.encode_plus(question, context)

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
	return answer