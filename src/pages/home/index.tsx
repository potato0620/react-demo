import './index.scss';

import { Layout, Menu, ConfigProvider, Button } from 'antd';
import type { MenuProps } from 'antd';

const { Sider, Content } = Layout;
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const contentStyle: React.CSSProperties = {
	// width: '100%',
	// height: '100%',
	// overflow: 'hidden'
};

const layoutStyle: React.CSSProperties = {
	height: '100%',
	width: '100%',
	fontFamily: 'Pixel'
};

const siderStyle: React.CSSProperties = {
	background: '#fff',
	fontFamily: 'Pixel',
	transition: 'all .5s ease-in-out'
};

const menuStyle: React.CSSProperties = {
	fontFamily: 'Pixel'
}

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('SignaturePad', 'signaturePad'),
	getItem('PageClipPath', 'pageClipPath'),
	getItem('ThreeModel', 'webgl'),
	getItem('ThreeFont', 'pageThreeFont'),
	getItem('ThreeLight', 'threeLight'),
	getItem('ThreeShadow', 'threeShadow'),
	getItem('ThredHouse', 'threeHouse'),
	getItem('ThreeParticles', 'threeParticles'),

];

export default function Home() {
	const navigate = useNavigate();
	const { pathname } = useLocation();  /* 获取当前路由 */
	const currKey = pathname.split('/')[2]; 
	const defaultKey = [currKey];

	return (
		<Layout style={layoutStyle}>
			<Sider style={siderStyle} collapsible collapsedWidth={0}>
				<div id='dls-box' className='p-10px font-800 inline-flex items-center w-full text-18px'>
					<img src="/imgs/dls.jpg" alt="" className='w-50px h-50px rounded-1/2 mr-8px'/>
					Potao demos
				</div>
				<ConfigProvider theme={{
					components: {
						Menu: {
							itemSelectedBg: '#797979',
							itemSelectedColor: '#ffffff'
						}
					}
				}}>
					<Menu
						mode="inline"
						style={menuStyle}
						items={items}
						defaultSelectedKeys={defaultKey}
						onSelect={({ key }) => {
							navigate(`/demo/${key}`);
						}}
					/>
				</ConfigProvider>
			</Sider>
			<Content style={contentStyle}>
				<Outlet></Outlet>
			</Content>
		</Layout>
	);
}
