import React, {useState} from "react";
import Template from '../Template';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { UserOutlined, LineChartOutlined, BookOutlined, UnorderedListOutlined } from '@ant-design/icons';
import BannerLight from "../../assets/img/banner-light.png";
import LogoLight from "../../assets/img/logo-light.png";
import { useUser } from "../../AuthContext";
import privateAPI from "./privateAPI";
import "../../assets/styles/area-riservata.css";
import ListaPrenotazioni from "./ListaPrenotazioni";

export default AreaRiservata;

function AreaRiservata(){
	const [collapsed, setCollapsed] = useState(false);
	const [ContentComponent, setContent] = useState(<ListaPrenotazioni />);
	const {state} = useUser();
	const {role} = state;

	const onCollapse = () => {
		setCollapsed(!collapsed);
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={400}>
			{
				collapsed ? 
					<img src={LogoLight} className='slider-logo-collapsed' /> :
					<img src={BannerLight} className='slider-logo' />
			}
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
				<Menu.Item key="1" icon={<UnorderedListOutlined />} onClick={() => {
					setContent(<ListaPrenotazioni />);
				}}>
					Lista prenotazioni
				</Menu.Item>
				<Menu.Item key="2" icon={<BookOutlined />} onClick={() => {console.log('prenotazione')}}>
					Prenotazione
				</Menu.Item>
				<Menu.Item key="3" icon={<LineChartOutlined />} onClick={() => {console.log('statistiche')}}>
					Statistiche
				</Menu.Item>
				{
					role == 'amministratore_presidio' ? 
						<Menu.Item key="4" icon={<LineChartOutlined />} onClick={() => {console.log('statistiche')}}>
							Crea operatore sanitario
						</Menu.Item>
					: ''
				}
				{
					role == 'amministratore_sistema' ? 
						<Menu.Item key="5" icon={<LineChartOutlined />} onClick={() => {console.log('statistiche')}}>
							Crea presidio
						</Menu.Item>
					: ''
				}
			</Menu>
        </Sider>
		<Layout>
		<Content style={{padding: '100px', overflow: "scroll"}}>
			{ContentComponent}
		</Content>
		<Footer style={{ textAlign: 'center' }}>Tamponi Italia ©2020 Created by SoftWar</Footer>
		</Layout>
		</Layout>
	);
}