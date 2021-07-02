import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "./contexts/authContext";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<Router>
					<App />
				</Router>
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
