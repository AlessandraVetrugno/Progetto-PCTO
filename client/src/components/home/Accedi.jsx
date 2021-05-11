import React from "react";
import { Form, Input, Tooltip, Button } from 'antd';
import { UserOutlined, InfoCircleOutlined, LockOutlined  } from '@ant-design/icons';
import {PopUp, appear} from "../PopUp";
import api from '../../api';

// importo il mio gestore di utenti
import { useUser } from '../../AuthContext';

//importo la cronologia delle pagine che mi serve per muovermi fra di esse
import { useHistory } from "react-router-dom";

export default Accedi;

function Accedi() {
	return (
        <>
            <Button shape="round" icon={<UserOutlined />} size={'large'} className="btn-home"
            style={{ backgroundColor: '#52c41a', color: 'white'}}
            onClick={ () => appear(true, 'accedi-window') } >
                Area riservata
            </Button>
            <PopUp component={<AccediWindow />} style={{height: '600px'}} />
        </>
	);
}

function AccediWindow() {
    const {dispatch} = useUser();
    let history = useHistory();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
        api.login({
            username: values.user,
            password: values.pass
        }).then(response => {
            console.log(response);
            sessionStorage.setItem('user', JSON.stringify(response?.dati));
            dispatch({
                type: 'login', 
                payload: {
                    username: response?.dati.codice,
                    role: response?.dati.ruolo
                }
            });
            history.push("/test-privato");
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <div className="accedi-window window">
            <h3>Accedi</h3>
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
                    label="Utente"
                    name="user"
                    rules={[
                    {
                        required: true, 
                        message: 'Utente non inserito!',
                    },
                    ]}
                >
                    <Input 
                        placeholder="codice utente" 
                        prefix={<UserOutlined />} 
                        suffix={
                            <Tooltip title="è necessario inserire le credenziali per poter accedere all'area riservata">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="pass"
                    rules={[
                    {
                        required: true, 
                        message: 'Password non inserita!',
                    },
                    ]}
                >
                    <Input.Password 
                        placeholder="password" 
                        prefix={<LockOutlined />} 
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Accedi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}