import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

const PageHome = React.lazy(() => import('@/pages/home'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <PageHome />,
	},
]);

export { router };
