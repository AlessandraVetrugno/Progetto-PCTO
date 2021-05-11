import React, {useState, useEffect} from "react";
import { Button, message } from 'antd';
import { PopUp, appear } from '../PopUp';
import api from "../../api";

export default Annulla;

function Annulla(props){
	return (
		<>
			<Button danger type="primary" size={"large"}
				onClick={() => {
					appear(true, 'annulla-check-window')
				}}>
				Annulla la prenotazione
			</Button>
			<PopUp component={<AnnullaCheck prenotazione={props.prenotazione} />} style={{height: '400px', width: '600px'}}  />
			{/* <AnnullaCheck prenotazione={props.prenotazione} /> */}
		</>
	);
}

function AnnullaCheck(props){
	const sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	return (
		<div className='annulla-check-window window'>
			Sei sicuro di voler annullare la tua prenotazione?
			<div className="annulla-check-button-bar">
				<Button danger type="primary" size={"large"}
					onClick={()=>{
						console.log('annulliamo deh');
						api.annullaPrenotazione(props.prenotazione.codice)
						.then(response => {
							if (!response.status) message.error('Errore durante l\'annullamento della prenotazione!');
							else message.success('Prenotazione annullata con successo');
						});
						appear(false, 'annulla-check-window');
						message.loading('Tornando nella home page')
						sleep(2000).then(() => {location.assign('/')});
						
					}}>
					Confermo
				</Button>
				<Button size={"large"}
					onClick={() => {
						appear(false, 'annulla-check-window');
					}}>
					Cancella
				</Button>
			</div>
		</div>
	);
}