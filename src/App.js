import React, {Fragment, useState} from 'react';
import Navbar from "./components/layout/Navbar";
import './App.css';
import Users from "./components/users/Users";
import  axios from "axios"
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import About from "./components/pages/About";
import User from "./components/users/User";

const App = ()=>{

    const [users,setUsers] = useState([]);
    const [user,setUser] = useState({});
    const [repos,setRepos] = useState([]);
    const [loading,setLoading] = useState(false);
    let [alert,setAlert] = useState(null);

    // search github users
    const searchUsers = async (text) => {
       setLoading(true);
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUsers(res.data.items);
        setLoading(false);
    };

    // GET single userpage
    const getUser = async (userName) => {
        setLoading(true);
        const res = await axios.get(
            `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUser(res.data);
        setLoading(false);
    }

    //Get users repos
   const getUserRepos = async (userName) => {
       setLoading(true);
        const res = await axios.get(
            `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setRepos(res.data);
        setLoading(false);
    }

    // clear users from state
   const clearUsers = () => {
        setUsers(null);
        setLoading(false);
    }
    //Set alert
    const showAlert = (msg, type) =>{
        setAlert({msg, type});
        setTimeout(() => setAlert(null),5000)
    }

    return (
        <Router>

            <Fragment>
                <Navbar/>
                <div className="container">
                    <Alert alert={alert}/>
                   <Switch>
                       <Route exact path="/" render={props =>(
                           <Fragment>
                               <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert}/>
                               <Users loading={loading} users={users}/>
                           </Fragment>
                       )}/>

                       <Route exact path="/About" component={About} />
                       <Route exact path="/user/:login" render={props =>(
                           <Fragment>
                               <User {...props } getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading}/>
                           </Fragment>
                        )}/>
                   </Switch>
                </div>
            </Fragment>
        </Router>

    );
}

export default App;
