import { Footer } from '@app/ui/footer/Footer'
import { Header } from '@app/ui/header/Header'
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
