import { Footer, Header } from '@app/ui'
import { Outlet } from 'react-router'

export const Layout = () => {
	return (
		<div className='wrapper'>
			<Header />
			<main className='main'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
