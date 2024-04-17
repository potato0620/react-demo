import './index.scss';

import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Sider, Content } = Layout;
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const contentStyle: React.CSSProperties = {};

const layoutStyle: React.CSSProperties = {
	height: '100%',
	width: '100%',
};

const siderStyle: React.CSSProperties = {
	background: '#fff',
};
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
	getItem('webGL', 'webgl'),
	getItem('PageClipPath', 'pageClipPath'),
	getItem('PageThreeFont', 'pageThreeFont'),
	getItem('ThreeLight', 'threeLight'),
	getItem('ThreeShadow', 'threeShadow'),
];

export default function Home() {
	const navigate = useNavigate();
	const { pathname } = useLocation();  /* 获取当前路由 */
	const currKey = pathname.split('/')[2]; 
	console.log(currKey,'currKey')
	const defaultKey = [currKey];

	return (
		<Layout style={layoutStyle}>
			<Sider style={siderStyle}>
				<div className='p-24px bg-pink-100 font-800'>
					Potao demos:
				</div>
				<Menu
					mode="inline"
					style={{}}
					items={items}
					defaultSelectedKeys={defaultKey}
					onSelect={({ key }) => {
						navigate(`/demo/${key}`);
					}}
				/>
			</Sider>
			<Content style={contentStyle}>
				<Outlet></Outlet>
			</Content>
		</Layout>
	);
}
