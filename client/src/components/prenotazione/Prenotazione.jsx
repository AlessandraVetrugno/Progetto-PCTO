import React, {useState, useEffect} from "react";
import "../../assets/styles/home.css";
import Template from '../Template';
import { Descriptions } from 'antd';

export default Prenotazione;

function Prenotazione(){
	return (
		<Template {...{component: Content}} />
	);
}

function Content() {
	const [prenotazione, setPrenotazione] = useState(null);

	useEffect(() => {
		// recupero la prenotazione salvata nella sessione e la converto in un oggetto
		setPrenotazione(JSON.parse(sessionStorage.getItem('prenotazione')));
	}, [])

	return (
		<div className="gestionale-prenotazione">
			<Descriptions title="Prenotazione" bordered>
				<Descriptions.Item label="Regione">{prenotazione?.nome_regione}</Descriptions.Item>
				<Descriptions.Item label="Provincia">{prenotazione?.nome_provincia}</Descriptions.Item>
				<Descriptions.Item label="Presidio">{prenotazione?.nome_presidio}</Descriptions.Item>
				<Descriptions.Item label="Codice identificativo">{prenotazione?.codice}</Descriptions.Item>
				<Descriptions.Item label="Codice fiscale">{prenotazione?.codice_fiscale}</Descriptions.Item>
				<Descriptions.Item label="Data">{prenotazione?.data}</Descriptions.Item>
			</Descriptions>
			<pre>
				{JSON.stringify(prenotazione)}
			</pre>
		</div>
	);
}