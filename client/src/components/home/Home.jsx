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
				<Row gutter={[16, 16]} className="home-content">
					<Col  span={12}>
						<div className="introduction-message">VUOI PRENOTARE UN TAMPONE?</div> 
						<div className="introduction-text">
							È attivo un <b>portale</b> unico per la <b>prenotazione</b> online dei tamponi a livello <b>nazionale</b>.
							<br />Con il proprio <b>codice fiscale</b>, in totale autonomia, sarà possibile prenotare un tampone o un test rapido con <b>tre semplici passaggi</b> che prevedono:
							<ul>
								<li><b>aprire il sito </b> dal proprio computer di casa, ma anche da smartphone o tablet;</li>
								<li><b>inserire</b> il codice fiscale;</li>
								<li><b>scegliere</b> il presidio o il distretto preferito;</li>
								<li><b>selezionare</b> la data  in cui si vuole effettuare il tampone.</li>
							</ul>
							<b>attendere</b> la ricezione di un sms di conferma con possibilità di stamparsi il promemoria.
						</div>
					</Col>
					<Col  span={12}>
						<Carousel autoplay dotPosition={'right'} >
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