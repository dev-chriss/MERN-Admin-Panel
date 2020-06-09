import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import User from "../../pages/user";
import Map from "../../pages/map";
import AddForm from "../../pages/map/form/AddForm";
import EditForm from "../../pages/map/form/EditForm";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>

              <Route path="/admin/dashboard" component={Dashboard} />
              
              <Route exact path="/admin/user" component={User} />

              <Route exact path="/admin/map" component={Map} />
              <Route path="/admin/map/add" component={AddForm} />
              <Route path="/admin/map/edit/:id" component={EditForm} />

            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
