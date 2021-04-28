import { React, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  Wraper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function MealPreference({ userData }) {
  const classes = useStyles();
  const [breakfastCount, setBreakfastCount] = useState(1);
  const [lunchCount, setLunchCount] = useState(1);
  const [dinnerCount, setDinnerCount] = useState(1);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("form submitted");
      const payload = {
        user_id: userData.user_id,
        breakfastCount,
        lunchCount,
        dinnerCount,
      };

      const customAxios = axios.create({
        withCredentials: true,
      });

      console.log("payload= ", payload);

      const response = await customAxios.post(
        "http://localhost:5000/api/preference",
        payload
      );
      setOpen(true);

      console.log("Preference response : " + response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={classes.Wraper}>
      <h1>Meal Preference</h1>
      <br />
      <form onSubmit={onSubmitForm}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h1" variant="h5">
              Breakfast
            </Typography>
          </Grid>
          <Grid item>
            <Chip label={breakfastCount} />
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button
                aria-label="reduce"
                onClick={() => {
                  setBreakfastCount(Math.max(breakfastCount - 1, 0));
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  setBreakfastCount(breakfastCount + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h1" variant="h5">
              Lunch
            </Typography>
          </Grid>
          <Grid item>
            <Chip label={lunchCount} />
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button
                aria-label="reduce"
                onClick={() => {
                  setLunchCount(Math.max(lunchCount - 1, 0));
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  setLunchCount(lunchCount + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h1" variant="h5">
              Dinner
            </Typography>
          </Grid>
          <Grid item>
            <Chip label={dinnerCount} />
          </Grid>

          <Grid item>
            <ButtonGroup>
              <Button
                aria-label="reduce"
                onClick={() => {
                  setDinnerCount(Math.max(dinnerCount - 1, 0));
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  setDinnerCount(dinnerCount + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <br />
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
  );
}
