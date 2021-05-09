import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import PrivateRoute from "./components/PrivateRoute";

export function App() {
	return (
		// definisco le rotte private e pubbliche della pagina
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<PrivateRoute exact path="/test-privato" component={Home} />
				</Switch>
			</BrowserRouter>
		</>
	);
}
