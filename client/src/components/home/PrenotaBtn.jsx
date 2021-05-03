import React from "react";
import "../../assets/styles/prenota.css";

export default function PrenotaBtn() {
	return (
        <>
            <button className="prenota-btn popup" onClick={() => prenota()}>
                prenota
            </button>
            <PrenotaWindow />
        </>
	);
}

function PrenotaWindow() {
    return (
        <div class="popup prenota-window hidden" id="prenota-window">
            ciao come va?
        </div>
    );
}

function prenota(){
    appear(true, 'prenota-window');
}

function appear(doBlur, popupID, classesToBlur = ['navbar', 'footer']) {
	classesToBlur.forEach((classToBlur) => {
		let elements = document.getElementsByClassName(classToBlur);
		for (let i = 0; i < elements.length; i++)
			doBlur
				? elements[i].classList.add("blur")
				: elements[i].classList.remove("blur");
	});

	const popupClasses = document.getElementById(popupID).classList;
	doBlur ? popupClasses.remove("hidden") : popupClasses.add("hidden");
}