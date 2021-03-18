import { Component } from 'react';
import { render } from 'react-dom';
import AppMain from './App.jsx';

import './index.css';

class App extends Component {
	render() {
		return <AppMain />;
	}
}

render(<App />, document.querySelector('main'));