import { createMuiTheme } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[800],
			light: green[300],
			dark: green[600],
		},
		secondary: {
			main: blue[700],
			light: blue[400],
			dark: blue[500],
		},
	},
	overrides: {
		MuiButton: {
			root: {
				textTransform: "none",
			},
		},
	},
	props: {
		MuiButton: {
			disableRipple: true,
		},
	},
});

export default theme;
