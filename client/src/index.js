import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

// importo lo stile del framework Ant Design e la lingua italiana
import { ConfigProvider } from 'antd';
import itIT from 'antd/lib/locale/it_IT';
import 'antd/dist/antd.css';

const rootElement = document.getElementById("app");

ReactDOM.render(
	<ConfigProvider locale={itIT}>
		<App />
	</ConfigProvider>,
	rootElement
);
