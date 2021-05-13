import React, {useState, useEffect} from "react";
import { Table, Tag, Typography } from 'antd';
import { UserOutlined, MinusCircleOutlined , CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import BannerLight from "../../assets/img/banner-light.png";
import { useUser } from "../../AuthContext";
import privateAPI from "./privateAPI";
import "../../assets/styles/area-riservata.css";

const { Text } = Typography;

export default ListaPrenotazioni;

function ListaPrenotazioni() {
    const [prenotazioni, setPrenotazioni] = useState(null);
    const {state} = useUser();
    const {presidio} = state;

    useEffect(() => {
        privateAPI.getListaPrenotazioni({id_presidio: presidio?.id})
        .then((res) => {
            console.log('risposta server:', res);
            res.dati = res?.dati.map(
                (prenotazione, index) => {
                    let tags = [];
                    if (prenotazione.eseguito == "1") tags.push('eseguito');
                    if (prenotazione.annullato == "1") tags.push('annullato');
                    return {
                        ...prenotazione, 
                        key: index, 
                        altro: tags
                    }
                }
            );
            console.log('temp prenotazione:', res);
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
            title: 'Annullata',
            dataIndex: 'annullato',
            key: 'annullato',
            render: annullato => {
                if (parseInt(annullato))
                    return <Tag icon={<MinusCircleOutlined />} color="warning">annullata</Tag>
            }
        },
        {
            title: 'Eseguita',
            dataIndex: 'eseguito',
            key: 'eseguito',
            render: eseguito => {
                if (parseInt(eseguito))
                    return <Tag icon={<CheckCircleOutlined  />} color="success">eseguita</Tag>
            }
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
            title: 'Altro',
            dataIndex: 'altro',
            key: 'altro',
            render: tags => {
                <>
                {tags.map((tag, index) => {
                    console.log(tag);
                    if (tag = 'eseguito')
                        return <Tag icon={<CheckCircleOutlined  />} color="success">eseguita</Tag>
                    if (tag = 'annullato')
                        return <Tag icon={<MinusCircleOutlined />} color="warning">annullata</Tag>

                    return (
                        <>{' ‏‏‎ '}</>
                    );
                })}
                </>
            }
        }
    ];

    return (
        <div>
            <Text strong>Lista delle prossime prenotazioni</Text>
            <Table columns={columns} dataSource={prenotazioni?.dati} />
        </div>
    );
}