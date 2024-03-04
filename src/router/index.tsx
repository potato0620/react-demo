import { createBrowserRouter } from 'react-router-dom';
// import React from 'react';
import Home from '@/pages/home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
]);

export { router };
