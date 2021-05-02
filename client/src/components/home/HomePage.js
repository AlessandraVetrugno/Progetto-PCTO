import React from "react";
import { Redirect, Link } from "react-router-dom";
import "../../assets/styles/home.css";
import BannerImage from "url:../../assets/img/banner.png";

function HomePage() {
	return (
		<>
			<NavBar />
			<Content />
			<Footer />
		</>
	);
}

function NavBar() {
	return (
		<div className="navbar">
			<img src={BannerImage} />
		</div>
	);
}

function Footer() {
	return (
		<div className="footer">
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
			<a href="https://github.com/NizarNadif/prenotazioni" target="_blank">
				<i className="fab fa-github" aria-hidden="true"></i>
			</a>
		</div>
	);
}

function Content() {
	return (
		<div className="content">
			questo è il contenuto della pagina
		</div>
	);
}

export default HomePage;
