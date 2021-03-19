import {
	createMuiTheme, ThemeProvider, makeStyles,
	AppBar, Toolbar, Typography
} from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

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
					{props.children}
				</Typography>
			</Toolbar>
		</AppBar>
	</ThemeProvider>;
};

export default Footer;