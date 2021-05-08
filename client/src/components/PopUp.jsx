import React from "react";
import '../assets/styles/popup.css';

export function PopUp({ component: ComponentJSX }) {

	return (
		<div className="popup hidden">
			<ComponentJSX />
            <CloseBtn />
		</div>
	);
}

function CloseBtn(){
    return (
        <i 
            className="fas fa-times popup-close" 
            onClick={() => {
                    console.log('chiudi popup');
                    appear(false, 'prenota-window');
            }}
            aria-hidden="true" />
    )
}

export function appear(doBlur, popupClass, classesToBlur = ['navbar', 'footer']) {
	classesToBlur.forEach((classToBlur) => {
		let elements = document.getElementsByClassName(classToBlur);
		for (let i = 0; i < elements.length; i++){
            if (doBlur) 
                elements[i].classList.add("blur");
            else elements[i].classList.remove("blur");
        }
	});

	const popupClasses = document.getElementsByClassName(popupClass)[0].parentNode.classList;

    if (doBlur) popupClasses.remove('hidden');
    else popupClasses.add('hidden');
}