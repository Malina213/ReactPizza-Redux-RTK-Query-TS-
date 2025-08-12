import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '@app/layouts/Layout'
import { Loader } from '@shared/ui/loader/Loader'

const Home = lazy(() =>
	import('@pages/home/Home').then(module => ({ default: module.Home }))
)
const Cart = lazy(() =>
	import('@pages/cart/Cart').then(module => ({ default: module.Cart }))
)
const NotFoundPage = lazy(() =>
	import('@pages/notFound/NotFoundPage').then(module => ({
		default: module.NotFoundPage
	}))
)

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<Loader />}>
						<Home />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: (
					<Suspense fallback={<Loader />}>
						<Cart />
					</Suspense>
				)
			},
			{
				path: '*',
				element: (
					<Suspense fallback={<Loader />}>
						<NotFoundPage />
					</Suspense>
				)
			}
		]
	}
])

export const Router = () => {
	return <RouterProvider router={router} />
}
