import { IoCartOutline } from 'react-icons/io5'
import { BsBucket } from 'react-icons/bs'
import { Button } from '@shared/ui/Button'
import { useCartActions } from '@entities/cart/hooks/useCartActions'
import { useGetCartQuery } from '@entities/cart/api/cartApi'
import styles from './CartTop.module.css'

export const CartTop = () => {
	const { data: cartItems = [] } = useGetCartQuery()
	const { handleClearCart } = useCartActions()

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
						onClick={handleClearCart}
					>
						<BsBucket />
						<span>Очистить корзину</span>
					</Button>
				</>
			)}
		</div>
	)
}
