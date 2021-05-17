import React, {useState, useEffect} from "react";
import { Table, Tag, Typography, Popover, message, Modal, Form, Input } from 'antd';
import { ClockCircleOutlined, MinusCircleOutlined , SettingTwoTone, CheckCircleOutlined, BookOutlined } from '@ant-design/icons';
import { useUser } from "../../AuthContext";
import privateAPI from "./privateAPI";
import api from "../../api";
import "../../assets/styles/area-riservata.css";

//importo la cronologia delle pagine che mi serve per muovermi fra di esse
import { useHistory } from "react-router-dom";

const { Text } = Typography;
const { TextArea } = Input;

export default ListaPrenotazioni;

function ListaPrenotazioni() {
    const [prenotazioni, setPrenotazioni] = useState(null);
    const {state} = useUser();
    const {presidio} = state;
    

    useEffect(() => {
        privateAPI.getListaPrenotazioni({id_presidio: presidio?.id})
        .then((res) => {
            setPrenotazioni(res);
        });
    }, []);

    const DateFormatted = data => {
		let mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
		var day = data.getDate();
		var month = mesi[parseInt(data.getMonth())];
		var year = data.getFullYear();
		return `${day} ${month} ${year}`;
	}

    const columns = [
        {
            title: 'Codice',
            dataIndex: 'codice',
            key: 'codice',
        },
        {
            title: 'Codice fiscale',
            dataIndex: 'codice_fiscale',
            key: 'codice_fiscale',
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            render: data => {
                return DateFormatted(new Date(data));
            }
        },
        {
            title: 'Stato',
            dataIndex: '',
            key: '',
            render: (data, record) => {
                if (parseInt(record.annullato)) {
                    return <Tag icon={<MinusCircleOutlined />} color="warning">annullata</Tag>
                } else if (parseInt(record.eseguito)) {
                    return <Tag icon={<CheckCircleOutlined  />} color="success">eseguita</Tag>
                } else {
                    return <Tag icon={<ClockCircleOutlined />} color="default">waiting</Tag>
                }
            }
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            render: (data, record) => {
                if (!parseInt(record.annullato) && !parseInt(record.eseguito)) {
                    return (
                        <Impostazioni prenotationData={record} />
                    )
                }
            }
        },
    ];

    return (
        <div>
            <Text strong>Lista delle prossime prenotazioni</Text>
            <Table columns={columns} dataSource={prenotazioni?.dati} rowKey="id" />
        </div>
    );
}

function Impostazioni({...props}){
    const [insertNotes, setInsertNotes] = useState({visible: false, callback: () => {}});
    const [notes, setNotes] = useState(null);

    const history = useHistory();
    const sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
    
    const annulla = (text) => {
        api.annullaPrenotazione(props.prenotationData.codice, text)
        .then(response => {
            if (!response.status) {
                message.error('Errore durante l\'annullamento della prenotazione!');
                resetState();
            } else {
                message.success('Prenotazione annullata con successo');
                history.push('/');
                history.push('/area-riservata');
            }
        });
    }
    
    const esegui = (text) => {
        privateAPI.eseguiPrenotazione(props.prenotationData.codice, text)
		.then(response => {
            if (!response.status) {
                message.error('Errore durante l\'esecuzione della prenotazione!');
                resetState();
            } else {
                message.success('Tampone eseguito con successo');
                history.push('/');
                history.push('/area-riservata');
            }
		}) 
    }
    
    const handleAnnulla = () => {
        setInsertNotes({visible: true, callback: annulla});
    }

    const handleEsegui = () => {
        setInsertNotes({visible: true, callback: esegui});
    }

    const notesChanged = (element) => {
        const text = element.target.value;
        setNotes(text);
    };

    const resetState = () => {
        setInsertNotes({value: false, callback: null});
    }

    return (
        <Popover title="Impostazioni" placement="left" trigger="hover" content={(
            <div className="impostazioni">
                <div onClick={() => handleAnnulla()} className="btn-annulla">annulla</div>
                <div onClick={() => handleEsegui()} className="btn-esegui">esegui</div>

                {/* popup che serve ad inserire le note di una prenotazione, invisibile fino a quando non viene attivato dallo stato} */}
                <Modal title="Inserisci le note" visible={insertNotes.visible} 
                onOk={
                        () => insertNotes.callback(notes)
                    }
                onCancel={resetState}>
                    <TextArea 
                        placeholder="Inserisci le note"
                        onChange={notesChanged}
                        prefix={<BookOutlined />}
                    />
                </Modal>
            </div>
        )}>
            <SettingTwoTone />
        </Popover>
    )
}