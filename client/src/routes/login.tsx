import React from "react";
import firebase from "firebase";
import {
	Container,
	Grid,
	Button,
	TextField,
	makeStyles,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
	background: {
		height: "100vh",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#333",
	},
	form: {
		backgroundColor: "eeeeee",
	},
}));

interface props {}

const Login: React.FC<props> = ({}) => {
	const classes = useStyles();
	const values = {
		username: "",
		password: "",
	};

	const handleSubmit = () => {};

	return (
		<main className={classes.background}>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container>
					<Grid item xs={12}>
						<TextField
							label="Username"
							name="username"
							value={values.username}
						/>
						<TextField
							label="Password"
							name="password"
							value={values.password}
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
						>
							Sign In
						</Button>
					</Grid>
				</Grid>
			</form>
		</main>
	);
};

export default Login;
