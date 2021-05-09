import React from "react";
import Template from './Template';
import { Result } from 'antd';

export default Error404;

function Error404(){
	return (
		<Template {...{component: Content}} />
	);
}

function Content() {
	return (

		<Result
			status="404"
			title="Error 404"
			subTitle="Scusa, sembra che la pagina che stai cercando non esista"
		/>
	);
}