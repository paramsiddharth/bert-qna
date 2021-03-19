import {
	useState
} from 'react';
import axios from 'axios';

const App = () => {
	const [result, setResult] = useState(null);
	const [context, setContext] = useState('');
	const [question, setQuestion] = useState('');

	const ask = async () => {
		try {
			setResult('...');
			const res = await axios.post(process.env.REACT_APP_API_URL, {
				context,
				question
			});
			if (res.data !== '')
				setResult(res.data);
			else
				setResult('Empty');
		} catch (e) {
			console.log(e.response);
			setResult('Error');
		}
	};

	return <>
		<div>
			<pre>
			Question: {
				question == ''
				? 'Empty'
				: question
			}
			<br/>
			Context: {
				context == ''
				? 'Empty'
				: context.length <= 30
				? context
				: (context.substr(0, 30) + '...')
			}
			<br/>
			Result: {
				result == null || result == ''
				? 'None'
				: result
			}
			</pre>
		</div>
		<div>
			<button
				onClick={ask} >
				Ask
			</button>
			<br/>
			<input placeholder='Question'
				value={question}
				onChange={e => setQuestion(e.target.value)} />
			<br/>
			<textarea
				placeholder='Context'
				value={context}
				onChange={e => setContext(e.target.value)} ></textarea>
		</div>
	</>;
};

export default App;