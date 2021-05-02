import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import PrivateRoute from "./components/PrivateRoute";

export function App() {
	return (
		// definisco le rotte private e pubbliche della pagina
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<PrivateRoute exact path="/test-privato" component={HomePage} />
				</Switch>
			</BrowserRouter>
		</>
	);
}
