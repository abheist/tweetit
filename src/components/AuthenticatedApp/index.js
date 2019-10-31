import React from "react";
import Axios from "axios";
import { BASE_URL } from "../../constants/routes";

class AuthenticatedApp extends React.Component {
    state = {
        tweetText: ""
    };

    handleSubmit = event => {
        event.preventDefault();
        Axios.defaults.headers.common["Authorization"] =
            "Token " + localStorage.getItem("appAuthToken");
        Axios.post(BASE_URL + "/tweet/", {
            tweet: this.state.tweetText
        })
            .then(response => {
                alert("Tweeted!!!");
                this.setState({ tweetText: "" });
            })
            .catch(err => console.console.error(err));
    };

    handleTweetChange = event => {
        this.setState({ tweetText: event.target.value });
    };

    render() {
        return (
            <div>
                <h1>Authenticated User</h1>
                <button onClick={this.props.logout}>SignOut</button>
                <hr />

                <form onSubmit={this.handleSubmit}>
                    <textarea
                        name="tweetBox"
                        id="tweetBox"
                        value={this.state.tweetText}
                        onChange={this.handleTweetChange}
                        cols="30"
                        rows="10"
                    ></textarea>
                    <button type="submit">Tweet</button>
                </form>
            </div>
        );
    }
}

export default AuthenticatedApp;
