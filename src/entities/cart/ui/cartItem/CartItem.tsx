import { GrFormClose } from 'react-icons/gr'
import { Button } from '@shared/ui/Button'
import { useCartActions } from '@entities/cart/hooks/useCartActions'
import { memo, useCallback } from 'react'
import type { Cart } from '@entities/cart/types'
import { CounterCart } from '@shared/ui'
import styles from './CartItem.module.css'

export const CartItem = memo(
	({ id, name, dough, size, imageUrl, price, quantity }: Cart) => {
		const { handleIncrement, handleDecrement, handleRemove, isUpdating } =
			useCartActions()

		const totalPrice = price * quantity

		const formatPrice = useCallback((price: number) => {
			return new Intl.NumberFormat('ru-RU').format(price)
		}, [])

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
							onIncrement={() => handleIncrement({ id, quantity })}
							onDecrement={() => handleDecrement({ id, quantity })}
							isLoading={isUpdating}
						/>
						<div className={styles.cartItemPrice}>
							{formatPrice(totalPrice)} ₽
						</div>
						<Button
							className={`btnBase ${styles.cartItemDelete}`}
							onClick={() => handleRemove({ id })}
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
