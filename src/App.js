import React, {Fragment} from 'react';
import Navbar from "./components/layout/Navbar";
import './App.css';
import Users from "./components/users/Users";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import About from "./components/pages/About";
import User from "./components/users/User";

const App = ()=>{
        return (
        <GithubState>
            <AlertState>
                <Router>
                    <Fragment>
                        <Navbar/>
                        <div className="container">
                            <Alert />
                            <Switch>
                                <Route exact path="/" render={props =>(
                                    <Fragment>
                                        <Search />
                                        <Users />
                                    </Fragment>
                                )}/>
                                <Route exact path="/About" component={About} />
                                <Route exact path="/user/:login" component={User} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </AlertState>
        </GithubState>
    );
}

export default App;
