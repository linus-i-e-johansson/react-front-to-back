import React,{useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from "../types";

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== "production"){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}


const GithubState = props => {

    const initialState = {
        users:[],
        user:{},
        repos:[],
        loading:false
    }
    const [state, dispatch] = useReducer(githubReducer,initialState);

    // search github users
    const searchUsers = async (text) => {
        setLoading();// calls setloading
        const res = await axios.get( // makes the request
            `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({ //
            type: SEARCH_USERS, // dispatches the type of searchusers
            payload: res.data.items, // with the data
        })
    };

    // GET single userpage
    const getUser = async (userName) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch(
            {type: GET_USER,
             payload: res.data
            });
    }

    //Get users repos
    const getUserRepos = async (userName) => {
        setLoading();
        const res = await axios.get(
            `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({
            type:GET_REPOS,
            payload:res.data,
        });
    }

    // clear users from state
    const clearUsers = () => dispatch({type:CLEAR_USERS});
    //set loading
    const setLoading = () => {
        dispatch({type: SET_LOADING});// dispatches  the type of setloading to the reducer
    }
    return<GithubContext.Provider
        value={{
            users:state.users,
            user: state.user,
            repos:state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
    }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;