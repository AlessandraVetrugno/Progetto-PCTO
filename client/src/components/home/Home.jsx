import React from "react";
import { Redirect, Link } from "react-router-dom";
import "../../assets/styles/home.css";
import BannerImage from "url:../../assets/img/banner.png";
import Prenota from "./Prenota";
import Accedi from "./Accedi";
import Visualizza from "./Visualizza";
import Template from '../Template';
import { Carousel } from 'antd';

export default Home;

function Home(){
	return (
		<Template {...{component: Content}} />
	);
}

function Content() {
	return (
		<div className="home">
			<div className="button-bar">
				<Prenota />
				<Visualizza />
				<Accedi />
			</div>
			<CaroselloImmagini />
		</div>
	);
}

function CaroselloImmagini() {
	return (
		<div className="carosello">
			<Carousel autoplay>
				<div>
				<h3 className="img-carosello">1</h3>
				</div>
				<div>
				<h3 className="img-carosello">2</h3>
				</div>
				<div>
				<h3 className="img-carosello">3</h3>
				</div>
				<div>
				<h3 className="img-carosello">4</h3>
				</div>
			</Carousel>
		</div>
	)
}