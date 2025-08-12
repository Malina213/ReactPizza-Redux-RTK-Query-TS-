import type { Pizza } from '@entities/pizza/types'
import { PizzaCard } from '../pizzaCard/PizzaCard'
import styles from './PizzaList.module.css'

interface PizzaListProps {
	pizzas: Pizza[]
}

export const PizzaList = ({ pizzas }: PizzaListProps) => (
	<ul className={styles.pizzaList}>
		{pizzas.map(pizza => (
			<PizzaCard
				id={pizza.id}
				key={pizza.id}
				imageUrl={pizza.imageUrl}
				price={pizza.price}
				name={pizza.name}
				desc={pizza.desc}
				nutrition={pizza.nutrition}
			/>
		))}
	</ul>
)
