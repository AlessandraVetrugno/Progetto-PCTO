import React, {useState, useEffect} from "react";
import Template from '../Template';
import Annulla from './Annulla';
import { Divider, Row, Col, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import "../../assets/styles/prenotazione.css";

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

	const DateFormatted = data => {
		let mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
		var day = data.getDate();
		var month = mesi[parseInt(data.getMonth())];
		var year = data.getFullYear();
		return `${day} ${month} ${year}`;
	}

	return (
		<div className="gestionale-prenotazione">
			<Row gutter={[40, 16]}>
				<Col span={11}>
					<Row>
						<Col flex="300px"><b>Regione :</b></Col>
						<Col flex="auto">{prenotazione?.nome_regione}</Col>
					</Row>
					<Divider />
					<Row>
						<Col flex="300px"><b>Provincia :</b></Col>
						<Col flex="auto">{prenotazione?.nome_provincia}</Col>
					</Row>
					<Divider />
					<Row>
						<Col flex="300px"><b>Presidio :</b></Col>
						<Col flex="auto">{prenotazione?.nome_presidio}</Col>
					</Row>
					{
						parseInt(prenotazione?.eseguito) || parseInt(prenotazione?.annullato) ?
						<>
							<Divider />
							<Row>
								<Col flex="300px"><b>Altro :</b></Col>
								<Col flex="auto">
									{
										parseInt(prenotazione?.eseguito) ? 
										<Tag icon={<CheckCircleOutlined />} color="success">ESEGUITO</Tag> : ''
									}
									{
										parseInt(prenotazione?.annullato) ? 
										<Tag icon={<CloseCircleOutlined />} color="error">ANNULLATO</Tag> : ''
									}
									{' ‏‏‎ '}
								</Col>
							</Row>
						</>
						: ''
					}
					
				</Col>
				<Col span={11}>
					<Row>
						<Col flex="300px"><b>Codice fiscale :</b></Col>
						<Col flex="auto">{prenotazione?.codice_fiscale}</Col>
					</Row>
					<Divider />
					<Row>
						<Col flex="300px"><b>Codice :</b></Col>
						<Col flex="auto">{prenotazione?.codice}</Col>
					</Row>
					<Divider />
					<Row>
						<Col flex="300px"><b>Note :</b></Col>
						<Col flex="auto">{prenotazione?.note == null ? 'nessuna' : prenotazione?.note }</Col>
					</Row>
					<Divider />
					<Row>
						<Col flex="300px"><b>Giorno :</b></Col>
						<Col flex="auto">{prenotazione?.data != undefined ? DateFormatted(new Date(prenotazione?.data)) : 'wait pls'}</Col>
					</Row>
				</Col>
			</Row>
			{
				(!parseInt(prenotazione?.annullato) && !parseInt(prenotazione?.eseguito)) ?
					<Annulla prenotazione={prenotazione} /> : <></>
			}
		</div>
	);
}