import React from "react";
import { Route, Redirect } from "react-router-dom";

// it redirects to "/" path (home page) if you do not have
// the permissions while trying to access a certain page
function PrivateRoute({ component: Component, ...rest }) {
	const isAuthenticated = true;
	return (
		<Route
			{...rest}
			render={(props) => {
				return isAuthenticated ? <Component {...props} /> : <Redirect to="/" />;
			}}
		/>
	);
}

export default PrivateRoute;
