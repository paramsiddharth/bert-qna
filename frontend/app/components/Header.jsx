import {
	createMuiTheme, ThemeProvider,
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

const Header = props => {
	return <ThemeProvider theme={theme} >
		<AppBar position='static' color='primary' >
			<Toolbar>
				<Typography 
					style={{
						color: 'white',
						textDecoration: 'none'
					}}
					component='a'
					href='.'
					variant='h6' >
					😉 {props.title}
				</Typography>
			</Toolbar>
		</AppBar>
	</ThemeProvider>;
};

export default Header;