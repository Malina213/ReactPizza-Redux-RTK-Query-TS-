import { IoCartOutline } from 'react-icons/io5'
import { BsBucket } from 'react-icons/bs'
import { Button } from '@shared/ui/Button'
import { useCartActions } from '@entities/cart/hooks/useCartActions'
import { useGetCartQuery } from '@entities/cart/api/cartApi'
import { useCallback } from 'react'
import styles from './CartTop.module.css'

export const CartTop = () => {
	const { data: cartItems = [] } = useGetCartQuery()
	const { handleClearCart } = useCartActions()

	const handleClearWithConfirmation = useCallback(() => {
		if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
			handleClearCart()
		}
	}, [handleClearCart])

	return (
		<div className={`${styles.cartTop} flexBetween`}>
			{cartItems.length > 0 && (
				<>
					<h3 className={styles.cartTitle}>
						<IoCartOutline />
						Корзина
					</h3>
					<Button
						className={styles.cartBusketButton}
						aria-label='Очистить корзину'
						onClick={handleClearWithConfirmation}
					>
						<BsBucket />
						<span>Очистить корзину</span>
					</Button>
				</>
			)}
		</div>
	)
}
