import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from '@/router/index';

export default function App() {
	
	return (
		<ConfigProvider>
			<RouterProvider router={router} />
		</ConfigProvider>
	) 
}
