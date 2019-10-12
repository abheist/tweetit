import React from "react";

const UnauthenticatedApp = props => (
    <div>
        <h1>UnauthenticatedApp</h1>
        <button onClick={props.authenticate}>Sign me in!</button>
    </div>
);

export default UnauthenticatedApp;
