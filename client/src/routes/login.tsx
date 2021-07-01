import React, { useState } from "react";
import users from "../api/users";
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
		const passwordAuth = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#*\$%&\?]).{8,}/;
		if (!passwordAuth.test(password)) {
			return "Password must contain at least 8 characters and one number, letter and special character";
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

	const handleLogin = async () => {};

	const handleRegister = async (e: BtnE) => {
		e.preventDefault();
		const { username, password } = values;

		// Attempt to sign-in the user if values are valid
		if (validateValues(username, password)) {
			let temp = Object.assign({}, errors);
			const user = await users.signIn(username, password);
			console.log(user);
			//window.location.href = "/";
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
							type="submit"
							variant="contained"
							size="large"
							onClick={handleLogin}
						>
							Login
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
							onClick={handleRegister}
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
