import { PizzaListContainer } from '@entities/pizza/ui'
import { Filters } from '@features/filters/ui/Filters'

export const Home = () => {
	return (
		<section className='home'>
			<h2 className='visually-hidden'>
				Главная страница с фильтрами и списком пицц
			</h2>
			<div className='container'>
				<Filters />
				<PizzaListContainer />
			</div>
		</section>
	)
}
