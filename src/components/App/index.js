import React from "react";
import { firebaseApp } from "./../Firebase/firebase";
import * as firebase from "firebase/app";
import "firebase/auth";
import AuthenticatedApp from "../AuthenticatedApp";
import UnauthenticatedApp from "../UnauthenticatedApp";
import Axios from "axios";
import { BASE_URL } from "../../constants/routes";

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
                accessTokenSecret: localStorage.getItem("twitterSecret")
            }
        };
        this.setState(newState);
    };

    authHandler = async data => {
        localStorage.setItem("twitterAccessToken", data.credential.accessToken);
        localStorage.setItem("twitterSecret", data.credential.secret);
        Axios.post(BASE_URL + "/rest-auth/twitter/", {
            access_token: localStorage.getItem("twitterAccessToken"),
            token_secret: localStorage.getItem("twitterSecret")
        })
            .then(response => {
                localStorage.setItem("appAuthToken", response.data.key);
                console.log("response======");
                console.log(response);
            })
            .catch(err => console.console.error(err));
        const newState = {
            uid: data.user.uid,
            twitterKeys: {
                accessToken: data.credential.accessToken,
                accessTokenSecret: data.credential.secret
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
