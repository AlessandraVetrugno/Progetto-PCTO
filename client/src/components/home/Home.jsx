import React from "react";
import { Redirect, Link } from "react-router-dom";
import "../../assets/styles/home.css";
import BannerImage from "url:../../assets/img/banner.png";
import Prenota from "./Prenota";
import Accedi from "./Accedi";
import Visualizza from "./Visualizza";
import Template from '../Template';
import { Carousel, Image } from 'antd';
import ImgCarosello1 from "url:../../assets/img/carousel/slide1.jpeg";
import ImgCarosello2 from "url:../../assets/img/carousel/slide2.jpeg";
import ImgCarosello3 from "url:../../assets/img/carousel/slide3.jpeg";
import ImgCarosello4 from "url:../../assets/img/carousel/slide4.jpeg";

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

	/* const imgStyle = {
		height: '100%',
		width: 'auto'
	} */

	const imgStyle = {}

	return (
		<div className="carosello">
			<Carousel autoplay>
			{/* <div>
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
				</div> */}
				<img className="img-carosello" style={imgStyle}
					src={ImgCarosello1}
					/>
				<img className="img-carosello" style={imgStyle}
					src={ImgCarosello2}
					/>
				<img className="img-carosello" style={imgStyle}
					src={ImgCarosello3}
					/>
				<img className="img-carosello" style={imgStyle}
					src={ImgCarosello4}
					/>
			</Carousel>
		</div>
	)
}