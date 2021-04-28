import React, { Fragment, useState, useEffect } from "react";
import "./App.css";

import { NavBar } from "./Components/NavBar";
import { ManagerSideBar, MemberSidebar } from "./Components/SideBar";

import { useStyles } from "./shared-styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import AddBazar from "./Components/Bazar/addBazar";

import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import BazarList from "./Components/Bazar/bazarList";
import DashboardView from "./Components/Dashboard/dashboardView";
import AddTransaction from "./Components/Transaction/AddTransaction";
import Transactions from "./Components/Transaction/ListTransaction";
import MealPreference from "./Components/Meal/MealPreference";
import PreferenceList from "./Components/Meal/mealPreferenceLisi";
import Users from "./Components/Users/users";
import AddUsers from "./Components/Users/AddUsers";
import ViewMeal from "./Components/Meal/ViewMeal";
import MonthlyBill from "./Components/Bill/bill";

export function Main(props) {
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/isloggedin",
          {
            withCredentials: true,
          }
        );

        console.log(response);
        setUserName(response.data.name);
        //fetch important data backend
        const userData = await axios.get("http://localhost:5000/api/userdata", {
          withCredentials: true,
        });
        console.log("userDataResponse: ", userData.data);

        setData({
          user_id: userData.data.user_id,
          userName: userData.data.userName,
          mess_id: userData.data.mess_id,
          messName: userData.data.mess,
          messAddress: userData.data.address,
          is_manager: userData.data.is_manager,
        });
      } catch (err) {
        console.log(err);
        console.log("response data = ", err.response.data);
        console.log("status code = ", err.response.status);
        if (err.response.status === 403) {
          props.history.push("/signin");
        }
      }
    }

    getUserData();
  }, []);

  const [data, setData] = useState({
    user_id: "",
    UserName: "",
    mess_id: "",
    messName: "",
    messAddress: "",
    is_manager: false,
  });
  console.log("setData: ", data);
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  function Sidebar() {
    const is_manager = data.is_manager;
    if (is_manager) {
      return <ManagerSideBar />;
    }
    return <MemberSidebar />;
  }
  const manager = true;

  return (
    <Fragment>
      <Router>
        <NavBar userName={userName} userData={data} />
        <Sidebar userName={userName} is_manager={manager} />
        <main className={classes.content}>
          <Toolbar />
          <Grid container justify="center">
            {/* <DashboardView /> */}

            <Switch>
              <Route exact path="/">
                <DashboardView userData={data} />
              </Route>
              <Route exact path="/addBazar">
                <AddBazar userData={data} />
              </Route>
              <Route exact path="/bazarList">
                <BazarList userData={data} />
              </Route>
              <Route exact path="/dashboard">
                <DashboardView userData={data} />
              </Route>
              <Route exact path="/addtransaction">
                <AddTransaction userData={data} />
              </Route>
              <Route exact path="/transactions">
                <Transactions userData={data} />
              </Route>
              <Route exact path="/addmealperference">
                <MealPreference userData={data} />
              </Route>
              <Route exact path="/preferences">
                <PreferenceList userData={data} />
              </Route>
              <Route exact path="/users">
                <Users />
              </Route>
              <Route exact path="/addusers">
                <AddUsers userData={data} />
              </Route>

              <Route exact path="/meallist">
                <ViewMeal />
              </Route>
              <Route exact path="/bill">
                <MonthlyBill />
              </Route>
            </Switch>
          </Grid>
        </main>
      </Router>
    </Fragment>
  );
}

export default Main;
