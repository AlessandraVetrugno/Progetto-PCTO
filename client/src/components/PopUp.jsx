import React, {useEffect, useState} from "react";
import '../assets/styles/popup.css';

export function PopUp({ component: ComponentJSX, ...props }) {

	return (
		<div className="popup no-blur hidden" style={props?.style}>
			{ComponentJSX}
            <CloseBtn />
		</div>
	);
}

function CloseBtn(){
    return (
        <i 
            className="fas fa-times popup-close" 
            onClick={ () => { appear(false) } }
            aria-hidden="true" />
    )
}

export function appear(doBlur, popupClass, classesToBlur = ['navbar', 'footer', 'button-bar', 'carosello', 'gestionale-prenotazione', 'home-content']) {
	classesToBlur.forEach((classToBlur) => {
		let elements = document.getElementsByClassName(classToBlur);
		for (let i = 0; i < elements.length; i++){
            if (doBlur) 
                elements[i].classList.add("blur");
            else elements[i].classList.remove("blur");
        }
	});
    
    if (doBlur) {
        // rendo visibile il popup chiamato
        const popupClasses = document.getElementsByClassName(popupClass)[0].parentNode.classList;
        popupClasses.remove('hidden');
        document.getElementById('app').classList.add('unscrollable');
    }
    else {
        // nascondo tutti i popup
        let popups = document.getElementsByClassName('popup');
        for (let popup of popups)
            popup.classList.add('hidden');

        // e rendo la pagina scorribile
        document.getElementById('app').classList.remove('unscrollable');
    }
}