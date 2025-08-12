import { useState, memo } from 'react'
import { PizzaDialog } from '@entities/pizza/ui/pizzaDialog/PizzaDialog'
import { Button } from '@shared/ui/Button'
import styles from './Pizza.module.css'
import type { Nutrition } from '@entities/pizza/types'

interface PizzaCardProps {
	id: number
	imageUrl: string
	price: number
	name: string
	desc: string
	nutrition: Nutrition
}

export const PizzaCard = memo(
	({ id, imageUrl, name, desc, nutrition, price }: PizzaCardProps) => {
		const [isOpen, setIsOpen] = useState(false)

		const handleOpenDialog = () => setIsOpen(true)

		return (
			<>
				<li className={styles.pizzaCard} id={`pizza_${id}`}>
					<article className={styles.pizzaCardInner} aria-label={name}>
						<div className={styles.pizzaCardTop}>
							<img
								src={imageUrl}
								alt={name}
								width={230}
								height={230}
								className={styles.pizzaCardImage}
								loading='lazy'
							/>
							<h4 className={styles.pizzaCardTitle}>{name}</h4>
							<p className={`${styles.pizzaCardDesc} h5`}>{desc}</p>
						</div>
						<div className={styles.pizzaCardBottom}>
							<div className={styles.pizzaCardPrice}>от {price} ₽</div>
							<Button
								type='button'
								className={styles.pizzaCardButton}
								aria-label={`Добавить ${name} в корзину`}
								onClick={handleOpenDialog}
							>
								<span>Выбрать</span>
							</Button>
						</div>
					</article>
				</li>
				{isOpen && (
					<PizzaDialog
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						name={name}
						imageUrl={imageUrl}
						desc={desc}
						price={price}
						nutrition={nutrition}
					/>
				)}
			</>
		)
	}
)
