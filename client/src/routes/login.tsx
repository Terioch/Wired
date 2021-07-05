import React, { useState } from "react";
import users from "../api/users";
import { useAuth } from "../contexts/authContext";
import { User } from "../models/Auth";
import {
	Button,
	TextField,
	Typography,
	Paper,
	makeStyles,
} from "@material-ui/core";

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
		"& > *": {
			margin: "0 .5rem",
		},
	},
	login: {
		backgroundColor: "#939393",
		color: "white",
		"&:hover": {
			backgroundColor: "#7E7E7E",
		},
	},
}));

interface props {}

interface Values {
	username: string;
	password: string;
}

type BtnE = React.MouseEvent<HTMLButtonElement>;
type ChangeE = React.ChangeEvent<HTMLInputElement>;

const Login: React.FC<props> = ({}) => {
	const classes = useStyles();
	const { setAuthState } = useAuth();
	const [values, setValues] = useState<Values>({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState({ ...values });

	const handleInputChange = (e: ChangeE) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const validateUsername = (username: string) => {
		if (!username) return "Please enter a username";
		if (username.length > 22) {
			return "Username cannot exceed 22 characters";
		}
		if (!/^[a-zA-Z0-9_]*$/.test(username)) {
			return "A username can only contain letters, numbers and underscores";
		}
		return "";
	};

	const validatePassword = (password: string) => {
		const passwordAuth = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Reference: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
		if (!passwordAuth.test(password)) {
			return "Password must contain at least 8 characters with at least one uppercase letter, lowercase letter and number";
		}
		return "";
	};

	const validateValues = (username: string, password: string) => {
		let temp = Object.assign({}, errors);
		temp.username = validateUsername(username);
		temp.password = validatePassword(password);
		setErrors(temp);
		return Object.values(temp).every(v => v === "");
	};

	const handleServerResponseErrors = (error: object) => {
		// Set new errors received from the server
		const errorKey = Object.keys(error)[0];
		const errorValue = Object.values(error)[0];
		let temp = {
			username: "",
			password: "",
		};

		setErrors({
			...temp,
			[errorKey]: errorValue,
		});
	};

	// Handle form submit
	const handleSubmit = async (e: BtnE) => {
		e.preventDefault();
		const { name } = e.currentTarget;
		const { username, password } = values;

		// Handle errors from server or succesfully login/register the user
		if (validateValues(username, password)) {
			const { username, password } = values;
			const response = await users.signIn(username, password, name);

			if (Object.keys(response).length < 2) {
				handleServerResponseErrors(response);
				return;
			}
			setAuthState(response);
			window.location.href = "/dashboard";
		}
	};

	return (
		<main className={classes.background}>
			<form className={classes.form}>
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
						name="username"
						color="secondary"
						value={values.username}
						error={errors.username ? true : false}
						helperText={errors.username}
						onChange={handleInputChange}
					/>
					<TextField
						label="Password"
						name="password"
						color="secondary"
						value={values.password}
						error={errors.password ? true : false}
						helperText={errors.password}
						onChange={handleInputChange}
					/>
					<div className={classes.btnContainer}>
						<Button
							className={classes.login}
							name="login"
							type="submit"
							variant="contained"
							size="large"
							onClick={handleSubmit}
						>
							Login
						</Button>
						<Button
							type="submit"
							name="register"
							variant="contained"
							color="primary"
							size="large"
							onClick={handleSubmit}
						>
							Register
						</Button>
					</div>
				</Paper>
			</form>
		</main>
	);
};

export default Login;
