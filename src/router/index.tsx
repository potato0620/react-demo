import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from '@/pages/home'
const ErrorPage = React.lazy(() => import('@/pages/404'))
// import PageSignaturePad from '@/pages/demo/SignaturePad';

const PageTextBg = React.lazy(() => import('@/pages/demo/textBg'))
const PageSignaturePad = React.lazy(() => import('@/pages/demo/SignaturePad'))
const PageWebGL = React.lazy(() => import('@/pages/demo/webgl'))
const PageClipPath = React.lazy(() => import('@/pages/demo/clip-path'))
const PageThreeFont = React.lazy(() => import('@/pages/demo/threeFont'))
const PageThreeLight = React.lazy(() => import('@/pages/demo/threeLight'))
const PageThreeShadow = React.lazy(() => import('@/pages/demo/threeShadow'))
const PageThreeHouse = React.lazy(() => import('@/pages/demo/threeHouse'))
const PageThreeParticles = React.lazy(() => import('@/pages/demo/thressParticles'))
const PageFlexLayout = React.lazy(() => import('@/pages/demo/flex-layout'))

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
            element: <PageTextBg />
          },
          {
            path: 'demo/signaturePad',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageSignaturePad />
              </React.Suspense>
            )
          },
          {
            path: 'demo/webgl',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageWebGL />
              </React.Suspense>
            )
          },
          {
            path: 'demo/pageClipPath',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageClipPath />
              </React.Suspense>
            )
          },
          {
            path: 'demo/pageThreeFont',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageThreeFont />
              </React.Suspense>
            )
          },
          {
            path: 'demo/threeLight',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageThreeLight />
              </React.Suspense>
            )
          },
          {
            path: 'demo/threeShadow',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageThreeShadow />
              </React.Suspense>
            )
          },
          {
            path: 'demo/threeHouse',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageThreeHouse />
              </React.Suspense>
            )
          },
          {
            path: 'demo/threeParticles',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageThreeParticles />
              </React.Suspense>
            )
          },
          {
            path: 'demo/flexLayout',
            element: (
              <React.Suspense fallback={'loading'}>
                <PageFlexLayout />
              </React.Suspense>
            )
          }
        ]
      }
    ]
  }
])

export { router }
