import React, {Fragment,Component} from 'react';
import Navbar from "./components/layout/Navbar";
import './App.css';
import Users from "./components/users/Users";
import  axios from "axios"
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import About from "./components/pages/About";
import User from "./components/users/User";

class App extends Component{

    state = {
        users: [],
        user:{},
        repos:[],
        loading : false,
        alert: null
    }
    /*
    async componentDidMount() {
        // make req to github api
        this.setState({loading: true})
        const res =  await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENTSECRET}`);
        this.setState({users: res.data, loading:false})
        console.log(res.data)
        `https://api.github.com/users/?q=${userName}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    }
    */
    // search github users
    searchUsers = async (text) => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ users: res.data.items, loading: false });
    };

    // GET single userpage
    getUser = async (userName) => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ user: res.data, loading: false });
    }

    //Get users repos
    getUserRepos = async (userName) => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ repos: res.data, loading: false });
    }

    // clear users from state
    clearUsers = () => {
        this.setState({users:[], loading:false})
    }
    //Set alert
    setAlert = (msg, type) =>{
        this.setState({
                alert:{msg, type}
        })

        setTimeout(() => this.setState({alert:null}),5000)
    }


    render(){
        const{user,users,repos,loading} = this.state;
    return (
        <Router>

            <Fragment>
                <Navbar/>
                <div className="container">
                    <Alert alert={this.state.alert}/>
                   <Switch>
                       <Route exact path="/" render={props =>(
                           <Fragment>
                               <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert}/>
                               <Users loading={loading} users={users}/>
                           </Fragment>
                       )}/>

                       <Route exact path="/About" component={About} />
                       <Route exact path="/user/:login" render={props =>(
                           <Fragment>
                               <User {...props } getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading}/>
                           </Fragment>
                        )}/>
                   </Switch>
                </div>
            </Fragment>
        </Router>

    );
  }

}

export default App;
