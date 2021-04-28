import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import {
  Send as SendIcon,
  LocalAtm as LocalAtmIcon,
  Fastfood as FastfoodIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Storefront as StorefrontIcon,
  PersonAdd as PersonAddIcon,
  PeopleAlt as PeopleAltIcon,
} from "@material-ui/icons";
import { GiOpenedFoodCan } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useStyles } from "../../shared-styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export function ManagerSideBar(props) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button component={Link} to={"/"}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to={"/addusers"}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Users" />
          </ListItem>
          <ListItem button component={Link} to={"/users"}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="User List" />
          </ListItem>
          <ListItem button component={Link} to={"/addbazar"}>
            <ListItemIcon>
              <AddShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Add Bazar" />
          </ListItem>
          <ListItem button component={Link} to={"/bazarlist"}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Bazar List" />
          </ListItem>
          <ListItem button component={Link} to={"/addtransaction"}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Add Transaction" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={"/transactions"}
          >
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction List" />
          </ListItem>
          <ListItem button component={Link} to={"/addmealperference"}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Meal Preference" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={"/preferences"}
          >
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Preference List" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={"/meallist"}
          >
            <ListItemIcon>
              <GiOpenedFoodCan />
            </ListItemIcon>
            <ListItemText primary="Meal List" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={"/bill"}
          >
            <ListItemIcon>
              <HiOutlineClipboardList />
            </ListItemIcon>
            <ListItemText primary="Monthly Bill" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export function MemberSidebar() {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button component={Link} to={"/"}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to={"/addbazar"}>
            <ListItemIcon>
              <AddShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Add Bazar" />
          </ListItem>
          <ListItem button component={Link} to={"/bazarlist"}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Bazar List" />
          </ListItem>
          <ListItem button component={Link} to={"/addtransaction"}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Add Transaction" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={"/transactions"}
          >
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction List" />
          </ListItem>
          <ListItem button component={Link} to={"/addmealperference"}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Meal Preference" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={"/meallist"}
          >
            <ListItemIcon>
              <GiOpenedFoodCan />
            </ListItemIcon>
            <ListItemText primary="View Meal" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
