import React from "react";
import Template from './Template';
import { Result } from 'antd';

export default Error403;

function Error403(){
	return (
		<Template {...{component: Content}} />
	);
}

function Content() {
	return (

		<Result
			status="403"
			title="Error 403"
			subTitle="Sembra che tu non disponga delle autorizzazioni necessarie per accedere a questa pagina"
		/>
	);
}