import React from "react";
import { Redirect, Link } from "react-router-dom";
import "../../assets/styles/home.css";
import BannerImage from "url:../../assets/img/banner.png";
import Prenota from "./Prenota";
import Template from '../Template';

export default Home;

function Home(){
	return (
		<Template {...{component: Content}} />
	);
}

function Content() {
	return (
			<Prenota />
	);
}