import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home';
const ErrorPage = React.lazy(() => import('@/pages/404'));
// import PageSignaturePad from '@/pages/demo/SignaturePad';

const PageSignaturePad = await React.lazy(
	() => import('@/pages/demo/SignaturePad')
);

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		caseSensitive: true,
		errorElement: (
			<React.Suspense fallback={'loading'}>
				<ErrorPage />
			</React.Suspense>
		),
		children: [
			{
				errorElement: (
					<React.Suspense>
						<ErrorPage />
					</React.Suspense>
				),
				children: [
					{
						index: true,
						element: <div>choose demo</div>,
					},
					{
						path: 'demo/signaturePad',
						element: (
							<React.Suspense fallback={'loading'}>
								<PageSignaturePad />
							</React.Suspense>
						),
					},
				],
			},
		],
	},
]);

export { router };
