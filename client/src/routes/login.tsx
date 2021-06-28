import React, { useState } from "react";
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
	},
}));

interface props {}

interface Values {
	username: string;
	password: string;
}

type FormE = React.FormEvent<HTMLFormElement>;
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
		// TODO: Verify that username is unique by querying database
		return "";
	};

	const validatePassword = (password: string) => {
		const passwordAuth = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#*\$%&\?]).{8,}/;
		if (!passwordAuth.test(password)) {
			return "Password must contain at least 8 characters and one number, letter and special character";
		}
		return "";
	};

	const authenticateValues = () => {
		let temp = Object.assign({}, errors);
		const { username, password } = values;
		temp.username = validateUsername(username);
		temp.password = validatePassword(password);
		setErrors(temp);
		return Object.values(temp).every(v => v === "");
	};

	const handleSubmit = (e: FormE) => {
		e.preventDefault();
		if (authenticateValues()) {
			// TODO: Send values to the server and store within storage
			window.location.href = "/";
		}
	};

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
