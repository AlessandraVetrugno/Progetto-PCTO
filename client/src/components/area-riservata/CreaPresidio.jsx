import React, {useState, useEffect} from "react";
import { Form, Cascader, Input, Tooltip, Button } from 'antd';
import { HomeOutlined, InfoCircleOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import BannerLight from "../../assets/img/banner-light.png";
import { useUser } from "../../AuthContext";
import privateAPI from "./privateAPI";
import "../../assets/styles/area-riservata.css";

export default CreaPresidio;

function CreaPresidio() {
    const [provinces, setProvinces] = useState(null);

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
        console.log(values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
                    maxLength={16}
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
    );
}