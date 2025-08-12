import { GrFormClose } from 'react-icons/gr'
import { CounterCart } from '@shared/ui/counter/CounterCart'
import { Button } from '@shared/ui/Button'
import { useCartActions } from '@entities/cart/hooks/useCartActions'
import { memo } from 'react'
import styles from './CartItem.module.css'
import type { Cart } from '@entities/cart/types'

export const CartItem = memo(
	({ id, name, dough, size, imageUrl, price, quantity }: Cart) => {
		const { handleIncrement, handleDecrement, handleRemove } = useCartActions()

		const handleIncrementItem = () => handleIncrement({ id, quantity })
		const handleDecrementItem = () => handleDecrement({ id, quantity })
		const handleRemoveItem = () => handleRemove({ id })

		const totalPrice = price * quantity

		return (
			<li className={styles.cartItem} id={id}>
				<article className={`${styles.cartItemInner} flexBetween`}>
					<div className={styles.cartItemLeft}>
						<img
							className={styles.cartItemImg}
							width={80}
							height={80}
							src={imageUrl}
							alt={name}
							loading='lazy'
						/>
						<div className={styles.cartItemText}>
							<h4>{name}</h4>
							<span>
								{dough}, {size} см.
							</span>
						</div>
					</div>
					<div className={styles.cartItemRight}>
						<CounterCart
							quantity={quantity}
							onIncrement={handleIncrementItem}
							onDecrement={handleDecrementItem}
						/>
						<div className={styles.cartItemPrice}>{totalPrice} ₽</div>
						<Button
							className={`btnBase ${styles.cartItemDelete}`}
							onClick={handleRemoveItem}
							aria-label={`Удалить ${name} из корзины`}
						>
							<GrFormClose />
						</Button>
					</div>
				</article>
			</li>
		)
	}
)

CartItem.displayName = 'CartItem'
