import React, {useState, useEffect} from "react";
import { Form, Cascader, Input, Tooltip, Button, Descriptions, Typography, message } from 'antd';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import privateAPI from "./privateAPI";
import "../../assets/styles/area-riservata.css";

const { Paragraph } = Typography;

export default CreaPresidio;

function CreaPresidio() {
    const [provinces, setProvinces] = useState('');
    const [AmministratorePresidio, setAmministratore] = useState(null);

    useEffect(() => {
        privateAPI.getProvinceCascader(setProvinces);
    }, []);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };

    const onFinish = (values) => {
        privateAPI.aggiungiPresidio(parseInt(values.provincia[1]), values.name)
        .then(res => setAmministratore(<DatiAmministratorePresidio data={res?.dati} />));
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="crea-presidio">
            <Form
                name="basic"
                size="large"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                {...layout}
            >
            <Form.Item
                label="Nome del presidio"
                name="name"
                rules={[
                {
                    required: true, 
                    message: 'Nome non inserito!',
                },
                ]}
                >
                    <Input 
                        placeholder="nome del presidio" 
                        maxLength={50}
                        prefix={<HomeOutlined />} 
                        suffix={
                            <Tooltip title="è necessario inserire il nome ed il luogo del presidio per poterlo registrare">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Provincia"
                    name="provincia"
                    rules={[
                    {
                        required: true, 
                        message: 'Provincia non selezionata!',
                    },
                    ]}
                >
                    <Cascader options={provinces} placeholder="Seleziona la provincia" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Crea
                    </Button>
                </Form.Item>
            </Form>

            {AmministratorePresidio}
        </div>
    );
}

function DatiAmministratorePresidio({...props}) {

    useEffect(() => {
        if (props?.data) message.success('Presidio aggiunto con successo');
    }, []);

    return (
        <Descriptions title="Credenziali dell'amministratore del nuovo presidio">
            <Descriptions.Item label="codice identificativo"><Paragraph copyable>{props?.data.codice}</Paragraph></Descriptions.Item>
            <Descriptions.Item label="password"><Paragraph copyable>{props?.data.password}</Paragraph></Descriptions.Item>
        </Descriptions>
    )
}