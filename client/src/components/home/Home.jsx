import React from "react";
import { Redirect, Link } from "react-router-dom";	
import "../../assets/styles/home.css";
import Prenota from "./Prenota";
import Accedi from "./Accedi";
import Visualizza from "./Visualizza";
import Template from '../Template';
import { Carousel, Image, Divider, Row, Col } from 'antd';
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
			<Divider />
			<div className="button-bar">
				<Prenota />
				<Visualizza />
				<Accedi />
			</div>
			<Divider />
			<CaroselloImmagini />
		</div>
	);
}

function CaroselloImmagini() {

	return (
		<>
				<Row gutter={[16, 16]}>
					<Col  span={12}>
						<div className="introduction-message">VUOI PRENOTARE UN TAMPONE?</div> 
						<div className="introduction-message">temp to write, waiting...</div> 
					</Col>
					<Col  span={12}>
						<Carousel autoplay dotPosition={'bottom'} >
							{
								Object.entries(ImmaginiCarosello)?.map(
									immagine => {
										return <Image key={immagine[0]} width={'100%'} height={'500px'} style={{padding: '100px'}} src={immagine[1]} />
									}
								)
							}
						</Carousel>
					</Col>
				</Row>
		</>
	)
}