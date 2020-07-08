import React, {Component} from 'react';
import PropTypes from "prop-types";

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text:""
        }
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = (e) => this.setState({[e.target.name]:e.target.value})

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.text === ""){
            this.props.setAlert("Please enter something", "light");
        }else{
            this.props.searchUsers(this.state.text);
            this.setState({text: " "})
        }

    }

    handleClear = ()=>{
        this.props.clearUsers();
    }

    render() {
        const {showClear} = this.props;
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input type="text" name="text" placeholder="search users" value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="search" className="btn btn-dark btn-block"/>
                </form>
                {showClear && <button className="btn btn-light btn-block" onClick={this.handleClear}>Clear</button>}

            </div>
        );
    }
}

export default Search;