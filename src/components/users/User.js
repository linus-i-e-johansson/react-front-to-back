import React, {Fragment, useContext, useEffect} from 'react';
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";



const User  = ({match})=> {

    const githubContext = useContext(GithubContext);
    const {getUser, getUserRepos, repos, loading, user} = githubContext;

    useEffect(()=>{
       getUser(match.params.login);
       getUserRepos(match.params.login);
       //eslint-disable-next-line
    },[]);

        const{
            name,
            avatar_url,
            location,
            bio,
            blog,
            website,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
            company
            } = user;

            if(loading){
                return <Spinner/>
            }

        return (
            <Fragment>
                <Link to="/" className="btn btn-light"> back to Search</Link>
                Hireable: {" "}
                {hireable ? <i className="fas fa-check text-success"/> : <i className="fas fa-times-circle text-danger"/>}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="profile-pic" className="round-img" style={{width:"150px"}} />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>{bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong>{login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company name: </strong>{login}
                                </Fragment>}
                            </li>
                            {blog && <Fragment>
                                <strong>Website name: </strong>{website}
                            </Fragment>}
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public repos: {public_repos}</div>
                    <div className="badge badge-dark">public gists: {public_gists}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        );
    }


export default User;