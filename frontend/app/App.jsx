import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

const App = () => {

	return <>
		<Header title='Answering Questions using BERT' />
		<Main />
		<Footer>
			Made with ❤ by <a href='https://www.paramsid.com'
				target='_blank' >Param</a> and <a href='https://github.com/DARK-art108'
				target='_blank' >Ritesh</a>.
		</Footer>
	</>;
};

export default App;