import { useEffect, useState } from 'react';
import {
	Box,
	Grid,
	Input,
	makeStyles,
	Paper
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import Loader from 'react-loader-spinner';

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:5000';

const BG_COLOR = deepOrange[300];
const TIMEOUT = 2700;

const useStyles = makeStyles(theme => ({
	parent: {
		backgroundColor: BG_COLOR,
		marginBottom: 0
	},
	main: {
		margin: 20,
		paddingBottom: 60,
		textAlign: 'center'
	},
	inputBox: {
		paddingLeft: 30,
		paddingRight: 30,
		[theme.breakpoints.up('md')]: {
			paddingLeft: 60,
			paddingRight: 60,
		}
	},
	emoji: {
		userSelect: 'none',
		fontSize: 100,
		order: 2,
		[theme.breakpoints.up('md')]: {
			fontSize: 150,
			order: 1
		}
	},
	output: {
		userSelect: 'none',
		fontSize: 30,
		order: 1,
		[theme.breakpoints.up('md')]: {
			fontSize: 50,
			order: 2
		}
	},
	loader: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block'
		}
	},
	loaderMobile: {
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
}));

const LoadingWala = () => {
	const classes = useStyles();

	return <>
		<Loader
			className={classes.loader}
			type="Circles"
			color={deepOrange[600]}
			height={100}
			width={100}
		/>
		<Loader
			className={classes.loaderMobile}
			type="Circles"
			color={deepOrange[600]}
			height={40}
			width={40}
		/>
	</>;
};

const Main = props => {
	const classes = useStyles();

	const [result, setResult] = useState('Ask me anything.');
	const [context, setContext] = useState('');
	const [question, setQuestion] = useState('');
	const [emoji, setEmoji] = useState(`🙂`);
	const [timeout, setRTimeout] = useState(null);

	useEffect(() => {
		if (context == '' || question == '')
			return;
		setEmoji(`🤔`);
		setResult(<LoadingWala />);
		if (timeout != null)
			clearTimeout(timeout);
		setRTimeout(setTimeout(ask, TIMEOUT));
	}, [context, question]);

	document.body.style.backgroundColor = BG_COLOR;

	const ask = async () => {
		if (context == '' || question == '')
			return;

		if (timeout)
			clearTimeout(timeout);

		try {
			const res = await axios.post(API_URL, {
				context,
				question
			});
			console.log(res.data);
			if (res.data !== '') {
				setResult(res.data);
				setEmoji(`😃`);
			} else {
				setEmoji(`😅`);
				setResult(`Didn't get it. Try again!`);
			}
		} catch (e) {
			console.log(e.response);
			setEmoji(`😴`);
			setResult(`I'm inactive...`);
		}
	};

	return <div className={classes.parent}>
		<Paper
			variant='outlined' 
			className={classes.main} elevation={14} >
			<div className={classes.inputBox}>
				<Box marginTop={6}>
					<Input value={question} onChange={e => setQuestion(e.target.value)}
						placeholder='Question (What is Param Siddharth known for?)'
						fullWidth />
				</Box>
				<Box marginTop={3}>
					<Input value={context} onChange={e => setContext(e.target.value)}
						placeholder='Context (Born in Bihar, India, Param Siddharth was a...)'
						fullWidth multiline rows={4} rowsMax={8} />
				</Box>
				<Box marginTop={3}>
					<Grid container spacing={3} >
						<Grid item xs={12} md={6} className={classes.emoji} >
							{emoji}
						</Grid>
						<Grid 
							id='result'
							item xs={12} md={6} className={classes.output}
							 >
							{result}
						</Grid>
					</Grid>
				</Box>
			</div>
		</Paper>
	</div>;
};

export default Main;