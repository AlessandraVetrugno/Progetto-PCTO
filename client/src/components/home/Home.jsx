import React from "react";
import { Redirect, Link } from "react-router-dom";
import "../../assets/styles/home.css";
import Prenota from "./Prenota";
import Accedi from "./Accedi";
import Visualizza from "./Visualizza";
import Template from '../Template';
import { Carousel, Image } from 'antd';
import ImmaginiCarosello from "../../assets/img/carousel/*.jpeg";

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
				{
					Object.entries(ImmaginiCarosello)?.map(
						immagine => {
							return <img className="img-carosello" key={immagine[0]} src={immagine[1]} />
						}
					)
				}
			</Carousel>
		</div>
	)
}