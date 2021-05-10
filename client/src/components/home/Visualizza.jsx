import React, {useContext, useReducer, useState, useEffect} from "react";
import { Form, Input, Tooltip, Button, DatePicker, message, Cascader, Result } from 'antd';
import { UserOutlined, InfoCircleOutlined, InfoCircleTwoTone  } from '@ant-design/icons';
import {PopUp, appear} from "../PopUp";
import test from '../../api.js';

export default Visualizza;

const AppContext = React.createContext(null);

const INITIAL_CONTEXT = {
    user: null,
    day: null,
    presidio: null,
    prenoted: false,
    prenotationCode: null
};

function Visualizza() {
    const [state, dispatch] = useReducer(reducer, INITIAL_CONTEXT);

	return (
        <AppContext.Provider value={{ state, dispatch }} >
            <Button shape="round" icon={<InfoCircleTwoTone />} size={'large'} className="btn-home"
            onClick={ () => appear(true, state.prenoted ? 'result-window' : 'visualizza-window') } >
                Visualizza una prenotazione
            </Button>
            <PopUp component={<Window context={AppContext}/>} />
        </AppContext.Provider>
	);
}

function Window() {
    const { state, dispatch } = useContext(AppContext);
    var SelectedWindow = VisualizzaWindow;
    if (state?.prenoted) SelectedWindow = ResultWindow;
    return (
        <SelectedWindow context={AppContext} />
    )
}

function ResultWindow(){
    return (
        <div className="result-window window">
            <Result
                status="success"
                title="Prenotazione effettuata con successo!"
                subTitle="Codice prenotazione: 8D923NIDA0DH9A Visualizza prenotazione" />
        </div>
    )
}

function VisualizzaWindow() {
    const { state, dispatch } = useContext(AppContext);


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
        console.log('Success:', values);

    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className="visualizza-window window">
            <h3>Visualizza</h3>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
                >

                <Form.Item
                    label="Codice fiscale"
                    name="codiceFiscale"
                    rules={[
                    {
                        required: true, 
                        message: 'Codice fiscale non inserito!',
                    },
                    ]}
                >
                    <Input 
                        placeholder="codice fiscale" 
                        maxLength={16}
                        prefix={<UserOutlined />} 
                        suffix={
                            <Tooltip title="è necessario inserire il codice fiscale per poter prenotare un tampone">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Codice prenotazione"
                    name="codicePrenotazione"
                    rules={[
                    {
                        required: true, 
                        message: 'Codice prenotazione non inserito!',
                    },
                    ]}
                >
                    <Input 
                        placeholder="codice prenotazione" 
                        maxLength={16}
                        prefix={<UserOutlined />} 
                        suffix={
                            <Tooltip title="è necessario inserire il codice della prenotazione per poter prenotare un tampone">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Prenota
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

function reducer(state, action) {
    let newState = {...state}
	switch (action.type) {
        case 'reset':
            newState = {...INITIAL_CONTEXT};
            break;
        case 'user':
            newState = {
                ...state,
                user: action.payload
            }
            break;
        case 'day':
            console.log(action.payload);

            const twoDigits = (number) => {
                return (number < 10 ? '0' : '') + number;
            };

            let date = action.payload._d;
            let day = twoDigits(date.getDate());
            let month = twoDigits((date.getMonth()%11) + 1);
            let year = date.getFullYear();

            date = `${year}-${month}-${day}`;

            newState = {
                ...state,
                day: date
            }
            break;
        case 'presidio':
            newState = {
                ...state,
                presidio: {
                    regione: parseInt(action.payload[0]), 
                    provincia: parseInt(action.payload[1]), 
                    presidio: parseInt(action.payload[2])
                }
            }
            break;
        case 'prenoted':
            newState = {
                ...state,
                prenoted: action.payload
            }
            break;
        case 'push-data':
            inviaDati({
                user: newState.user,
                day: newState.day,
                presidio: newState.presidio
            })
            break;
        default:
			break;
	}
    console.log(newState);
	return newState;
}