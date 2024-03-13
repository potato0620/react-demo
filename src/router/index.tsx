import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home';
const ErrorPage = React.lazy(() => import('@/pages/404'));
// import PageSignaturePad from '@/pages/demo/SignaturePad';

const PageSignaturePad = React.lazy(() => import('@/pages/demo/SignaturePad'));
const PageWebGL = React.lazy(() => import('@/pages/demo/webgl'));
const PageClipPath = React.lazy(() => import('@/pages/demo/clip-path'));

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
					{
						path: 'demo/webgl',
						element: (
							<React.Suspense fallback={'loading'}>
								<PageWebGL />
							</React.Suspense>
						),
					},
					{
						path: 'demo/pageClipPath',
						element: (
							<React.Suspense fallback={'loading'}>
								<PageClipPath />
							</React.Suspense>
						),
					},
				],
			},
		],
	},
]);

export { router };
