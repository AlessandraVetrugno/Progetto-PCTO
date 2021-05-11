import React, {useState, useEffect} from "react";
import { Descriptions, Button } from 'antd';
import { PopUp, appear } from '../PopUp';
import api from "../../api";

export default Annulla;

function Annulla(props){
	return (
		<>
			<Button danger type="primary"
				onClick={() => {
					appear(true, 'annulla-check-window')
				}}>
				Annulla la prenotazione
			</Button>
			<PopUp component={<AnnullaCheck prenotazione={props.prenotazione} />} style={{height: '500px'}}  />
			{/* <AnnullaCheck prenotazione={props.prenotazione} /> */}
		</>
	);
}

function AnnullaCheck(props){
	return (
		<div className='annulla-check-window window'>
			Sei sicuro di voler annullare la tua prenotazione?
			<div className="annulla-check-button-bar">
				<Button danger type="primary"
					onClick={()=>{
						console.log('annulliamo deh');
						api.annullaPrenotazione(props.prenotazione.codice);
					}}>
					Annulla
				</Button>
				<Button
					onClick={() => {
						appear(false, 'annulla-check-window');
					}}>
					Cancella
				</Button>
			</div>
		</div>
	);
}