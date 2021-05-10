import React, {useContext, useReducer, useState, useEffect} from "react";
import { Form, Input, Tooltip, Button, DatePicker, message, Cascader, Result, Spin, Typography } from 'antd';
import { UserOutlined, InfoCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import QRCode from "qrcode.react";
import {PopUp, appear} from "../PopUp";
import test from '../../api.js';

const { Paragraph } = Typography;

export default Prenota;

const AppContext = React.createContext(null);

const INITIAL_CONTEXT = {
    user: null,
    day: null,
    presidio: null,
    prenoted: false,
    prenotationCode: null,
    serverResponse: null
};

// TODO: resettare lo stato della prenotazione una volta chiuso il popup

function Prenota() {
    const [state, dispatch] = useReducer(reducer, INITIAL_CONTEXT);

    const btnStyle = {
        color: 'white',
        background: '#EA1A1A'
    }

	return (
        <AppContext.Provider value={{ state, dispatch }} >
            <Button shape="round" className="btn-home" icon={<CalendarOutlined />} danger type="primary" size={'large'}
            onClick={ () => appear(true, state.prenoted ? 'result-window' : 'prenota-window') } >
                Prenota
            </Button>
            <PopUp component={<Window context={AppContext}/>} style={{height: '600px'}} />
        </AppContext.Provider>
	);
}

function Window() {
    const { state, dispatch } = useContext(AppContext);
    var SelectedWindow = PrenotePage;
    if (state?.prenoted) SelectedWindow = ResultPage;
    return (
        <SelectedWindow context={AppContext} />
    )
}

function ResultPage(){
    const { state, dispatch } = useContext(AppContext);

    if (!state.serverResponse) {
        return (
            <div className="result-window window">
                <Spin tip="Caricamento..." size="large" />
            </div>
        )
    }

    return (
        <div className="result-window window">
            <Result
                status="success"
                title="Prenotazione effettuata con successo!"
                subTitle={`Codice prenotazione: ${state.serverResponse.dati.codice}`} 
                extra={[
                    <Paragraph copyable level={3}>{state.serverResponse.dati.codice}</Paragraph>,
                    <QRCode value={state.serverResponse.dati.codice} />
                ]} />
                
            
        </div>
    )
}

function PrenotePage() {
    const { state, dispatch } = useContext(AppContext);
    const [presidi, setPresidi] = useState(null);

    useEffect(() => {
        fetch('http://localhost/tamponi/get/all_rpp.php', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(b=>b.json())
        .then((data) => {
                var options = [];
                // una volta ottenuti i dati li formatto
                data.dati.forEach((regione, i) => {
                    options[i] = {
                        value: regione.id,
                        label: regione.nome,
                        children: []
                    }
                    
                    regione.province.forEach((provincia, j) => {
                        options[i].children[j] = {
                            value: provincia.id,
                            label: provincia.nome,
                            children: []
                        }
                        
                        provincia.presidi.forEach((presidio, k) => {
                            options[i].children[j].children[k] = {
                                value: presidio.id,
                                label: presidio.nome
                            }
                        })
                    })
                });

                setPresidi(options);
            }
        );
    });


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    let mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
        const handleChange = value => {
            var month = mesi[parseInt(value.format('MM'))];
            message.success(`Data scelta: ${value ? value.format(`DD ${month} YYYY`) : 'None'}`);
        };

        const onFinish = (values) => {
            console.log('Success:', values);

            dispatch({type: 'user', payload: values.code});
            dispatch({type: 'day', payload: values.day});
            dispatch({type: 'presidio', payload: values.presidio});
            dispatch({type: 'prenoted', payload: true});

            values.presidio = {
                regione: parseInt(values.presidio[0]), 
                provincia: parseInt(values.presidio[1]), 
                presidio: parseInt(values.presidio[2])
            }

            inviaDati({
                "user": values.code,
                "day": '2021-05-12',
                "presidio": values.presidio
            }).then(data => dispatch({type: 'server-response', payload: data}));

        };
        
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const disabledDate = (current) => {
            let valoreCurrent = current.valueOf();
            current = current._d;

            var dateVietate = [new Date('2021-05-10'), new Date('2021-05-25')];

            const twoDigits = (number) => {
                return (number < 10 ? '0' : '') + number;
            };

            let day = twoDigits(current.getDate());
            let month = twoDigits((current.getMonth()%11) + 1);
            let year = current.getFullYear();

            current = `${year}-${month}-${day}`;

            let flag = false;

            for (let i=0;  i < dateVietate.length && !flag; i++){
                let dayTemp = twoDigits(dateVietate[i].getDate());
                let monthTemp = twoDigits((dateVietate[i].getMonth()%11) + 1);
                let yearTemp = dateVietate[i].getFullYear();
                let textTemp = `${yearTemp}-${monthTemp}-${dayTemp}`;

                flag = current == textTemp;
            }

            // Can't select days before today and the forbidden days
            var condizioni = valoreCurrent < Date.now() || flag;

            return condizioni;
        }

    return(
        <div className="prenota-window window">
            <h3>Prenota un tampone</h3>
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
                    name="code"
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
                    label="Presidio"
                    name="presidio"
                    rules={[
                    {
                        required: true, 
                        message: 'Presidio non selezionato!',
                    },
                    ]}
                >
                    <Cascader options={presidi} placeholder="Seleziona il presidio" /* prefix={<HomeOutlined />} */ />
                </Form.Item>

                <Form.Item
                    label="Giorno"
                    name="day"
                    rules={[
                    {
                        required: true, 
                        message: 'Giorno non selezionato!',
                    },
                    ]}
                >
                    <DatePicker onChange={handleChange} disabledDate={disabledDate} />
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
        case 'server-response':
                newState = {
                    ...state,
                    serverResponse: action.payload
                }
                break;
        default:
		break;
	}
    console.log(newState);
	return newState;
}

async function inviaDati(data) {
    console.log(data);
    const response = await fetch('http://localhost/tamponi/prenotazioni/prenota.php', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json();
}
