import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from '../images/logo.png';
import Alert from '../alerts/Alert';


import { GlobalContext } from "../../context/GlobalState";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();

	const {
		registerUser,
		isAuthenticated,
		loadUser,
		token,
		setAlert,
		error,
		removeError,
	} = useContext(GlobalContext);

	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		password2: "",
	});

	useEffect(() => {
		if (token) {
			loadUser();
		}
		if (error) {
			setAlert(error);
			removeError();
		}
		// eslint-disable-next-line
	}, [error]);

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (user.password !== user.password2) {
			return setAlert("Passwords must match");
		}

		const newUser = {
			email: user.email,
			password: user.password,
		};

		registerUser(newUser);
	};

	return (
		<Container component="main" maxWidth="xs">
            <img src={logo} alt="Logo" />;
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
                <Alert />
				<form onSubmit={onSubmit} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
                                value={user.firstname}
								onChange={(e) => setUser({ ...user, firstname: e.target.value })}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
                                value={user.lastname}
								onChange={(e) => setUser({ ...user, lastname: e.target.value })}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								type="email"
								value={user.email}
								onChange={(e) => setUser({ ...user, email: e.target.value })}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								minLength="6"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={user.password}
								onChange={(e) =>
									setUser({
										...user,
										password: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								minLength="6"
								label="Confirm Password"
								type="password"
								id="password2"
								autoComplete="current-password"
								value={user.password2}
								onChange={(e) =>
									setUser({
										...user,
										password2: e.target.value,
									})
								}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
