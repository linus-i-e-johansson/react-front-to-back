import React, {Fragment} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/About" component={About} />
                                <Route exact path="/user/:login" component={User} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </AlertState>
        </GithubState>
    );
}

export default App;
