import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 200,
    margin: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  dashboardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: 1000,
  },
  cardContainer: {
    width: 280,
    height: 200,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#f4f4f4",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
});

export default function DashboardView() {
  const classes = useStyles();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dash", {
          withCredentials: true,
        });

        setDashboardData({
          lunch: response.data.data.todaysMeal.lunch,
          dinner: response.data.data.todaysMeal.dinner,
          breakfast: response.data.data.todaysMeal.breakfast,
          mealConsumed: response.data.data.totalMealConsumedByMe,
          myDeposit: response.data.data.myDeposit.amount,
          totalBazar: response.data.data.totalBazar.amount,
          totalMealOfMess: response.data.data.totalMealOfMess,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getDashboardData();
  }, []);

  const [dashboardData, setDashboardData] = useState({
    lunch: 0,
    dinner: 0,
    breakfast: 0,
    mealConsumed: 0,
    myDeposit: 0,
    totalBazar: 0,
    totalMealOfMess: 0,
  });
  const mealRate = (
    dashboardData.totalBazar / dashboardData.totalMealOfMess
  ).toFixed(3);
  const Balance =
    dashboardData.myDeposit - mealRate * dashboardData.mealConsumed;

  return (
    <div>
      <div class={classes.dashboardContainer}>
        <div class={classes.cardContainer}>
          <p>Today's Meal</p>
          <p>Breakfast: {dashboardData.breakfast} </p> <span></span>
          <p>Lunch: {dashboardData.lunch}</p>
          <p>Dinner: {dashboardData.dinner} </p>
        </div>
        <div class={classes.cardContainer}>
          <p>Meal Consumed</p>
          <p>{dashboardData.mealConsumed}</p>
        </div>
        <div class={classes.cardContainer}>
          <p>Deposit</p>
          <p>{dashboardData.myDeposit}</p>
        </div>
        <div class={classes.cardContainer}>
          <p>Total Bazar</p>
          <p>{dashboardData.totalBazar}</p>
        </div>
        <div class={classes.cardContainer}>
          <p>Total Meal</p>
          <p>{dashboardData.totalMealOfMess}</p>
        </div>
        <div class={classes.cardContainer}>
          <p>Meal Rate</p>
          <p>{mealRate}</p>
        </div>
        <div class={classes.cardContainer}>
          <p>Balance</p>
          <p>{Balance}</p>
        </div>
      </div>
    </div>
  );
}
