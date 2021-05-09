import React, {useEffect, useState} from "react";
import '../assets/styles/popup.css';

export function PopUp({ component: ComponentJSX }) {
	return (
		<div className="popup hidden">
			{ComponentJSX}
            <CloseBtn />
		</div>
	);
}

function CloseBtn(){
    const [popupClass, setClass] = useState(null);

    useEffect(() => {
        var popups = document.getElementsByClassName('popup');

        // lo converto in un array
        popups = Object.entries(popups);

        // mantengo solo quelli visibili
        popups.filter(popup => {return !popup?.classList.includes('hidden')});

        var popup = popups[0][1].childNodes[0];

        setClass(popup.classList[0]);
    })
    return (
        <i 
            className="fas fa-times popup-close" 
            onClick={ () => { appear(false, popupClass) } }
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