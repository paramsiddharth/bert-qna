from app_models import MODEL_PATH, ensure_models

ensure_models()

tokenizer = DistilBertTokenizer.from_pretrained(MODEL_PATH,return_token_type_ids = True)
model = DistilBertForQuestionAnswering.from_pretrained(MODEL_PATH)

def answer(context, question):
	return 'Default answer'
	