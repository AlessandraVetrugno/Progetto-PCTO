import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import Prenotazione from "./components/prenotazione/Prenotazione";
import Error404 from "./components/Error404";
import Error403 from "./components/Error403";
import PrivateRoute from "./components/PrivateRoute";
import AreaRiservata from "./components/area-riservata/AreaRiservata";

export function App() {
	return (
		// definisco le rotte private e pubbliche della pagina
		<>
			<BrowserRouter>
				<Switch>
					<PrivateRoute exact path="/test-privato" component={AreaRiservata} />
					<Route exact path="/" component={Home} />
					<Route exact path="/prenotazione" component={Prenotazione} />
					<Route exact path="/Error403" component={Error403} />
					<Route component={Error404} />
				</Switch>
			</BrowserRouter>
		</>
	);
}
