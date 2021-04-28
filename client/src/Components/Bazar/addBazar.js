import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddBazar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [input, setInput] = useState({
    bazar_date: "",
    amount: "",
    description: "",
  });
  const { bazar_date, amount, description } = input;
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bazar_date,
        amount,
        description,
      };

      const customAxios = axios.create({
        withCredentials: true,
      });

      const response = await customAxios.post(
        "http://localhost:5000/api/bazar",
        payload
      );
      setOpen(true);
      setInput({
        bazar_date: "",
        amount: "",
        description: "",
      });
      console.log("bazar response : " + response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <AddShoppingCartIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Add Bazar
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <TextField
            required
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="date"
            id="date"
            name="bazar_date"
            autoComplete="off"
            autoFocus
            value={bazar_date}
            onChange={(e) => onChange(e)}
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="text"
            id="amount"
            autoComplete="off"
            value={amount}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="amount"
            autoComplete="off"
            multiline
            rows={3}
            value={description}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Added Data successfully!
            </Alert>
          </Snackbar>
        </form>
      </div>
    </Container>
  );
}
