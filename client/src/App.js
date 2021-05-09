import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import Error404 from "./components/Error404";
import Error403 from "./components/Error403";
import PrivateRoute from "./components/PrivateRoute";

export function App() {
	return (
		// definisco le rotte private e pubbliche della pagina
		<>
			<BrowserRouter>
				<Switch>
					<PrivateRoute exact path="/test-privato" component={Home} />
					<Route exact path="/" component={Home} />
					<Route exact path="/Error403" component={Error403} />
					<Route component={Error404} />
				</Switch>
			</BrowserRouter>
		</>
	);
}
