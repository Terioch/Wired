import { createMuiTheme } from "@material-ui/core";
import { blue, indigo, lightBlue, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[800],
			light: green[300],
		},
		secondary: {
			main: indigo[500],
			light: indigo[300],
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
