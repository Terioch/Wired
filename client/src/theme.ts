import { createMuiTheme } from "@material-ui/core";
import {
	blue,
	purple,
	lightBlue,
	green,
	grey,
} from "@material-ui/core/colors";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[800],
			light: green[300],
		},
		secondary: {
			main: blue[700],
			light: blue[500],
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
