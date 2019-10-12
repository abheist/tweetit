import React from "react";

class AuthenticatedApp extends React.Component {
    handleTweet = () => {
        console.log("Handling tweet!!!");
    };

    render() {
        return (
            <div>
                <h1>Authenticated User</h1>
                <button onClick={this.props.logout}>SignOut</button>
                <hr />

                <textarea
                    name="tweetBox"
                    id="tweetbox"
                    cols="30"
                    rows="10"
                ></textarea>
                <button onClick={this.handleTweet}>Tweet</button>
            </div>
        );
    }
}

export default AuthenticatedApp;
