import React, {useContext, useReducer, useState, useEffect} from "react";
import { Form, Input, Tooltip, Button, Result } from 'antd';
import { UserOutlined, InfoCircleOutlined, BookOutlined, BookTwoTone  } from '@ant-design/icons';
import {PopUp, appear} from "../PopUp";
import api from '../../api.js';

export default Visualizza;

function Visualizza() {
	return (
        <>
            <Button shape="round" icon={<BookTwoTone />} size={'large'} className="btn-home"
            onClick={ () => appear(true, 'visualizza-window') } >
                Visualizza una prenotazione
            </Button>
            <PopUp component={<VisualizzaWindow />} style={{height: '600px'}} />
        </>
	);
}

function VisualizzaWindow() {
    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 10, span: 16 },
    };

    const onFinish = (values) => {
        const visualizzaPrenotazione = (data) => {
            sessionStorage.setItem('prenotazione', JSON.stringify(data.dati));
            location.assign('/prenotazione');
        }

        api.getPrenotazione(visualizzaPrenotazione, values);

    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className="visualizza-window window">
            <h3>Visualizza</h3>
            <Form
                name="basic"
                size="large"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
                >

                <Form.Item
                    label="Codice fiscale"
                    name="codice_fiscale"
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
                            <Tooltip title="è necessario inserire il codice fiscale per poter visualizzare una prenotazione">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Codice prenotazione"
                    name="codice_prenotazione"
                    rules={[
                    {
                        required: true, 
                        message: 'Codice della prenotazione non inserito!',
                    },
                    ]}
                >
                    <Input 
                        placeholder="codice prenotazione" 
                        prefix={<BookOutlined />}
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Visualizza
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}