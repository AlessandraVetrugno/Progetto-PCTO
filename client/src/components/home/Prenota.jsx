import React, {useContext, useReducer} from "react";
import { Form, Input, Tooltip, Button, DatePicker, message, Cascader, Result } from 'antd';
import { UserOutlined, InfoCircleOutlined, CalendarTwoTone } from '@ant-design/icons';
import {PopUp, appear} from "../PopUp";
import "../../assets/styles/prenota.css";
import test from '../../serverPlaceholder.js';

export default Prenota;

const AppContext = React.createContext(null);

const INITIAL_CONTEXT = {
    user: null,
    day: null,
    presidio: null,
    prenoted: false,
    prenotationCode: null
};

// TODO: resettare lo stato della prenotazione una volta chiuso il popup

function Prenota() {
    const [state, dispatch] = useReducer(reducer, INITIAL_CONTEXT);

	return (
        <AppContext.Provider value={{ state, dispatch }} >
            <Button shape="round" icon={<CalendarTwoTone />} size={'large'} 
            onClick={ () => appear(true, state.prenoted ? 'result-window' : 'prenota-window') } >
                Prenota
            </Button>
            <PopUp component={<Window context={AppContext}/>} />
        </AppContext.Provider>
	);
}

function Window() {
    const { state, dispatch } = useContext(AppContext);
    var SelectedWindow = PrenotaWindow;
    if (state?.prenoted) SelectedWindow = ResultWindow;
    return (
        <SelectedWindow context={AppContext} />
    )
}

function ResultWindow(){
    return (
        <div className="result-window">
            <Result
                status="success"
                title="Prenotazione effettuata con successo!"
                subTitle="Codice prenotazione: 8D923NIDA0DH9A Visualizza prenotazione" />
        </div>
    )
}

function PrenotaWindow() {
    const { state, dispatch } = useContext(AppContext);
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
            dispatch({type: 'prenoted', payload: true})
        };
        
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const disabledDate = (current) => {
            var dateVietate = [new Date('05/22/2021').valueOf(), new Date('05/26/2021').valueOf()];

            /* var data = `${current.getDate()}/${current.day() - 1}/${current.year()}`; */

            /* console.log(new Date(data)) */

            /* console.log(current.format('YYYY/MM/DD').valueOf() == dateVietate[0], current.format('YYYY/MM/DD').valueOf() == dateVietate[1]); */
            /* console.log(data); */
            var condizioni = current.valueOf() < Date.now();
            // Can not select days before today and today
            return condizioni;
        }

    return(
        <div className="prenota-window">
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
                    <Cascader options={getPresidi()} placeholder="Seleziona il presidio" /* prefix={<HomeOutlined />} */ />
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
                    <DatePicker onChange={handleChange} format="DD/MM/YYYY" disabledDate={disabledDate} />
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

function getPresidi() {
    var presidi;
    var options = [];

    /* fetch('./presidi.json', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    )
    .then(b => b.json())
    .then(dati => {
            presidi = dati;
            console.log(presidi);
        }
    ) */

    presidi = test.getPresidi()

    // una volta ottenuti i dati li formatto
    presidi.forEach((regione, i) => {
        options[i] = {
            value: regione.regione,
            label: regione.regione,
            children: []
        }

        regione.province.forEach((provincia, j) => {
            options[i].children[j] = {
                value: provincia.provincia,
                label: provincia.provincia,
                children: []
            }

            provincia.presidi.forEach((presidio, k) => {
                options[i].children[j].children[k] = {
                    value: presidio,
                    label: presidio
                }
            })
        })

    })

    return options;
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
            newState = {
                ...state,
                day: action.payload
            }
            break;
        case 'presidio':
            newState = {
                ...state,
                presidio: {
                    regione: action.payload[0], 
                    provincia: action.payload[1], 
                    presidio: action.payload[2]
                }
            }
            break;
        case 'prenoted':
            newState = {
                ...state,
                prenoted: action.payload
            }
            break;
        default:
			break;
	}
    console.log(newState);
	return newState;
}