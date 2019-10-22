import React from "react";
import { twitterKeys } from "../../constants/constants";

class AuthenticatedApp extends React.Component {
    handleTweet = () => {
        twitterKeys.accessToken = this.props.twitterKeys.accessToken;
        twitterKeys.accessTokenSecret = this.props.twitterKeys.accessTokenSecret;
        console.log(twitterKeys);
    };

    render() {
        return (
            <div>
                <h1>Authenticated User</h1>
                <button onClick={this.props.logout}>SignOut</button>
                <hr />

                <textarea
                    name="tweetBox"
                    id="tweetBox"
                    cols="30"
                    rows="10"
                ></textarea>
                <button onClick={this.handleTweet}>Tweet</button>
            </div>
        );
    }
}

export default AuthenticatedApp;
