import React, {useState} from "react";
import Template from '../Template';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { UserOutlined, VideoCameraOutlined, BookOutlined, UnorderedListOutlined } from '@ant-design/icons';
import BannerLight from "../../assets/img/banner-light.png";
import LogoLight from "../../assets/img/logo-light.png";
import "../../assets/styles/area-riservata.css";

export default AreaRiservata;

function AreaRiservata(){
	const [state, setState] = useState({collapsed: false});

	const onCollapse = () => {
		console.log(state);
		setState({
			collapsed: !state.collapsed,
		});
	}

	return (
		<Layout style={{ minHeight: '10vh' }}>
        <Sider trigger={null} collapsible collapsed={state?.collapsed} onCollapse={onCollapse} width={400}>
			{/* <img src={LogoLight} width={100}/> */}
			<img src={BannerLight} className='slider-logo' />
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
				Lista prenotazioni
            </Menu.Item>
            <Menu.Item key="2" icon={<BookOutlined />}>
				Prenotazione
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
				Bonifica una palude
            </Menu.Item>
			</Menu>
        </Sider>
		<Layout>
		{/* <Header style={{width: "100%", height: 100}}>
			<div className="logo" />
			<img src={BannerLight} height={100} />
		</Header> */}
		<Content>
			ciao come va?
		</Content>
		<Footer style={{ textAlign: 'center' }}>Tamponi Italia ©2020 Created by SoftWar</Footer>
		</Layout>
		</Layout>
	);
}