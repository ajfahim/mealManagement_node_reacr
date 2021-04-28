import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    messName: "",
    messAddress: "",
  });
  const { name, email, phone, password, messName, messAddress } = input;
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        email,
        phone,
        password,
        messName,
        messAddress,
      };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const persRes = await response.json();
      console.log("pers res = ", persRes);
      if (response.status === 200) {
        // prop.history.push("/signin");
        window.location.href = "/signin";
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>

        <form className={classes.form} Validate onSubmit={onSubmitForm}>
          <Grid container spacing={2}>
            <Grid container justify="flex-start">
              <Grid item>
                <Typography>User Information</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
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
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                value={phone}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            <Grid container justify="flex-start">
              <Grid item>
                <Typography>Mess Information</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="mess-name"
                name="messName"
                variant="outlined"
                required
                fullWidth
                id="messName"
                label="Mess Name"
                value={messName}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="mess-address"
                name="messAddress"
                variant="outlined"
                required
                fullWidth
                id="messAddress"
                label="Mess Address"
                value={messAddress}
                onChange={(e) => onChange(e)}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
