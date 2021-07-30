import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "./contexts/authContext";
import { FetchProvider } from "./contexts/fetchContext";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<FetchProvider>
						<App />
					</FetchProvider>
				</AuthProvider>
			</ThemeProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
