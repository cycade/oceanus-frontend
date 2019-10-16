import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6b7b69',
      main: '#404f3e',
      dark: '#192718',
      grey: '#404f3e',
    },
    secondary: {
      main: '#6b7b69',
      light: '#cecec4',
    },
    basic: {
      white: 'white',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;