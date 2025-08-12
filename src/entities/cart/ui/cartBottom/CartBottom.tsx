import { Button } from '@shared/ui/Button'
import { CustomLink } from '@shared/ui/customLink/CustomLink'
import { GoChevronLeft } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { CartSummary } from './CartSummary'
import { useCartSummary } from '@entities/cart/hooks/useCartSummary'
import { clearPromo } from '@app/store/slices/promoSlice'
import styles from './CartBottom.module.css'
import { useGetCartQuery } from '@entities/cart/api/cartApi'
import { useCartActions } from '@entities/cart/hooks/useCartActions'

export const CartBottom = () => {
	const { data: cartItems = [] } = useGetCartQuery()
	const { handleClearCart } = useCartActions()
	const dispatch = useDispatch()

	const { totalCost, totalQuantity, discountPercent, discountedTotal } =
		useCartSummary(cartItems)

	function handleButton() {
		dispatch(clearPromo())
		handleClearCart()
	}
	return (
		<div className={styles.cartBottom}>
			{cartItems.length > 0 && (
				<CartSummary
					totalQuantity={totalQuantity}
					totalCost={totalCost}
					discountPercent={discountPercent}
					discountedTotal={discountedTotal}
				/>
			)}
			<div className={`${styles.cartButton} flexBetween`}>
				<CustomLink
					to='/'
					className={`${styles.cartBackButton} btnBase`}
					aria-label='Вернуться назад'
				>
					<GoChevronLeft size={20} />
					<span>Назад</span>
				</CustomLink>
				{cartItems.length > 0 && (
					<Button
						className={`${styles.cartPaymentButton} button`}
						aria-label='Оплатить сейчас'
						onClick={handleButton}
					>
						<span>Оплатить</span>
					</Button>
				)}
			</div>
		</div>
	)
}
