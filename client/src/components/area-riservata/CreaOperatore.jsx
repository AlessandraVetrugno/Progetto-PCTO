import React, {useState, useEffect} from "react";
import { Button, message, Typography, Card, Input, Form } from 'antd';
import privateAPI from "./privateAPI";
import "../../assets/styles/area-riservata.css";
import { useUser } from "../../AuthContext";

const { Paragraph } = Typography;

export default CreaOperatore;

function CreaOperatore() {
    const {state} = useUser();
    const [OperatoreSanitario, setOperatoreSanitario] = useState(null);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const handleClick = () => {
        privateAPI.aggiungiOperatore(parseInt(state.presidio.id))
        .then(res => setOperatoreSanitario(<DatiOperatoreSanitario data={res?.dati} />))
    }

    return (
        <div className="crea-operatore">
            <Button onClick={handleClick} style={{margin: 100}}>crea un operatore sanitario</Button>
            {OperatoreSanitario}
        </div>
    );
}

function DatiOperatoreSanitario({...props}) {

    useEffect(() => {
        if (props?.data) message.success('Operatore creato con successo');
    }, []);

    return (
        <Card title={'Operatore ' + props?.data.codice} >
            <Form.Item label="Password" >
                <Input.Password value={props?.data.password} style={{ width: 200 }} />
            </Form.Item>
        </Card>
    )
}