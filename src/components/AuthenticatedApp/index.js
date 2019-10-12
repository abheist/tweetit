import React from "react";

const AuthenticatedApp = props => (
    <div>
        <h1>Authenticated User</h1>
        <button onClick={props.logout}>SignOut</button>
    </div>
);

export default AuthenticatedApp;
