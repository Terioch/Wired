import React, { useState } from "react";
import {
	Container,
	Grid,
	Button,
	TextField,
	Typography,
	Paper,
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
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: "1rem",
		width: "500px",
		[theme.breakpoints.down("xs")]: {
			width: "85%",
		},
		"& > *": {
			margin: "0.5rem 0",
		},
	},
	headerContainer: {
		textAlign: "center",
	},
	btnContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

interface props {}

const Login: React.FC<props> = ({}) => {
	const classes = useStyles();
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = () => {};

	return (
		<main className={classes.background}>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Paper className={classes.paper} elevation={10}>
					<div className={classes.headerContainer}>
						<Typography variant="h5" gutterBottom>
							Sign in to
						</Typography>
						<Typography style={{ fontSize: "28px" }} color="secondary">
							Wired
						</Typography>
					</div>
					<TextField
						label="Username"
						color="secondary"
						name="username"
						value={values.username}
						onChange={handleInputChange}
					/>
					<TextField
						label="Password"
						name="password"
						value={values.password}
						onChange={handleInputChange}
					/>
					<div className={classes.btnContainer}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
						>
							Sign In
						</Button>
					</div>
				</Paper>
			</form>
		</main>
	);
};

export default Login;
