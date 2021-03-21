import {
	createMuiTheme, ThemeProvider, makeStyles,
	AppBar, Toolbar, Typography
} from '@material-ui/core';
import { purple, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[400]
		}
	}
});

const useStyles = makeStyles(theme => ({
	main: {
		position: 'fixed',
		bottom: 0,
		'& a': {
			color: 'white'
		}
	}
}));

const Footer = props => {
	const classes = useStyles();

	return <ThemeProvider theme={theme} >
		<AppBar className={classes.main} position='static' color='primary'
			style={{
				alignItems: 'center'
			}}
			>
			<Toolbar>
				<Typography
					align='center'
					variant='h6' >
					Made with <span style={{
						color: red[400],
						WebkitTextStrokeWidth: '1px',
						WebkitTextStrokeColor: 'black'
					}}>❤</span> by <a href='https://www.paramsid.com'
					target='_blank' >Param</a> and <a href='https://github.com/DARK-art108'
					target='_blank' >Ritesh</a>.
				</Typography>
			</Toolbar>
		</AppBar>
	</ThemeProvider>;
};

export default Footer;