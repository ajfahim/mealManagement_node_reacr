import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { Button } from "@material-ui/core";

const LogoutButton = async (prop) => {
  const response = await axios.delete("http://localhost:5000/api/logout", {
    withCredentials: true,
  });
  if (response.status === 200) {
    // prop.history.push("/signin");
    window.location.href = "/signin";
  }
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export function NavBar(props) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container justify="flex-start">
          <Typography variant="h6" noWrap>
            Meal Manager {props.userData.messName}
          </Typography>
        </Grid>

        <Grid container justify="flex-end">
          <Grid item>
            <Typography variant="h6">Hi {props.userName}</Typography>
          </Grid>
          <Grid item>
            <Button
              endIcon={<ExitToAppIcon />}
              size="inherit"
              color="inherit"
              onClick={LogoutButton}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
