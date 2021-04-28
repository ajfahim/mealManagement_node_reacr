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
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { DateTime } from "luxon";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

export default function AddTransaction() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [input, setInput] = useState({
    transaction_date: DateTime.local().toFormat("yyyy-MM-dd"),
    amount: 0,
    transaction_type: "deposit",
  });
  const { transaction_date, amount, transaction_type } = input;
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        transaction_date,
        amount,
        transaction_type,
      };

      const customAxios = axios.create({
        withCredentials: true,
      });

      const response = await customAxios.post(
        "http://localhost:5000/api/transaction",
        payload
      );
      setOpen(true);
      setInput({
        transaction_type: "deposit",
        transaction_date: DateTime.local().toFormat("yyyy-MM-dd"),
        amount: 0,
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
        <AccountBalanceWalletOutlinedIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Add Transaction
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
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
            onChange={(e) =>
              setInput({
                ...input,
                amount: e.target.value,
              })
            }
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="date"
            id="date"
            name="transaction_date"
            autoComplete="off"
            value={transaction_date}
            onChange={(e) => {
              setInput({
                ...input,
                transaction_date: e.target.value,
              });
            }}
          />

          <FormControl className={classes.formControl}>
            <Select
              fullWidth
              variant="outlined"
              labelId="transaction_type"
              name="transaction_type"
              id="transaction_type"
              value={input.transaction_type}
              onChange={(e) => {
                console.log(e.target.value);
                setInput({
                  ...input,
                  transaction_type: e.target.value,
                });
              }}
            >
              <MenuItem value="deposit">Deposit</MenuItem>
              <MenuItem value="withdrawal">withdraw</MenuItem>
            </Select>
          </FormControl>
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
