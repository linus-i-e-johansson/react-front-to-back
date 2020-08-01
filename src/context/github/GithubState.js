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
import {createPortal} from "react-dom";

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
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        dispatch({ //
            type: SEARCH_USERS, // dispatches the type of searchusers
            payload: res.data.items, // with the data
        })
    };
    //Get user
    //get repos
    //clear users
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
            searchUsers
    }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;