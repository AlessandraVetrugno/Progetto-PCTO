import React from "react";
import { Redirect, Link } from "react-router-dom";
import "../assets/styles/template.css";
/* import GitHubIcon from '@material-ui/icons/GitHub'; */
import BannerImage from "../assets/img/banner.png";

function Template({component: ComponentJSX}) {
	return (
		<>
			<NavBar />
			<Content component={ComponentJSX}/>
			<Footer />
		</>
	);
}

function NavBar() {
	return (
		<header className="navbar">
			<img className="banner" src={BannerImage}/>
		</header>
	);
}

function Footer() {
	return (
		<footer className="footer">
			<div className="copyright-container">
				<i className="far fa-copyright" aria-hidden="true"></i>
				<div className="autori">
					<p>Alimeta Nezir</p>
					<p>Gavazzi Federico</p>
					<p>Nadif Nizar</p>
					<p>Shermadhi Matteo</p>
					<p>Vetrugno Alessandra</p>
				</div>
			</div>
			{/* <GitHubIcon className="icon-github" /> */}
			<a href="https://github.com/NizarNadif/prenotazioni" target="_blank">
				<i className="fab fa-github" aria-hidden="true"></i>
			</a>
		</footer>
	);
}

function Content({component: ComponentJSX}) {
	return (
		<div className="content">
				<ComponentJSX props/>
		</div>
	);
}

export default Template;
