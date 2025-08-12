import { CartBottom } from '@entities/cart/ui/cartBottom/CartBottom'
import { CartList } from '@entities/cart/ui/cartList/CartList'
import { CartTop } from '@entities/cart/ui/cartTop/CartTop'
import styles from './Cart.module.css'
export const Cart = () => {
	return (
		<section className='cart'>
			<h2 className='visually-hidden'>Корзина с товарами</h2>
			<div className={`container ${styles.cartInner}`}>
				<CartTop />
				<CartList />
				<CartBottom />
			</div>
		</section>
	)
}
