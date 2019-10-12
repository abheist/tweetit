import React from "react";
import { firebaseApp } from "./../Firebase/firebase";
import * as firebase from "firebase/app";
import "firebase/auth";

import AuthenticatedApp from "../AuthenticatedApp";
import UnauthenticatedApp from "../UnauthenticatedApp";

class App extends React.Component {
    state = {
        uid: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async data => {
        console.log(data);
        this.setState({
            uid: data.user.uid
        });
    };

    logout = async () => {
        console.log("Logging out!");
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
                    <AuthenticatedApp logout={this.logout} />
                ) : (
                    <UnauthenticatedApp authenticate={this.authenticate} />
                )}
            </div>
        );
    }
}

export default App;
