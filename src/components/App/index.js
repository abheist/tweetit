import React from "react";
import { firebaseApp } from "./../Firebase/firebase";
import * as firebase from "firebase/app";
import "firebase/auth";

import AuthenticatedApp from "../AuthenticatedApp";
import UnauthenticatedApp from "../UnauthenticatedApp";

class App extends React.Component {
    state = {
        uid: null,
        twitter: {
            accessToken: null,
            accessTokenSecret: null
        }
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.userAuthHandler({ user });
            }
        });
    }

    userAuthHandler = async data => {
        const newState = {
            uid: data.user.uid,
            twitter: {
                accessToken: localStorage.getItem("twitterAccessToken"),
                secret: localStorage.getItem("twitterSecret")
            }
        };
        this.setState(newState);
    };

    authHandler = async data => {
        localStorage.setItem("twitterAccessToken", data.credential.accessToken);
        localStorage.setItem("twitterSecret", data.credential.secret);
        const newState = {
            uid: data.user.uid,
            twitter: {
                accessToken: data.credential.accessToken,
                secret: data.credential.secret
            }
        };
        this.setState(newState);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    authenticate = () => {
        const authProvider = new firebase.auth.TwitterAuthProvider();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    render() {
        return (
            <div>
                <h1>JusTwittit</h1>
                {this.state.uid ? (
                    <AuthenticatedApp
                        logout={this.logout}
                        twitterKeys={this.state.twitter}
                    />
                ) : (
                    <UnauthenticatedApp authenticate={this.authenticate} />
                )}
            </div>
        );
    }
}

export default App;
