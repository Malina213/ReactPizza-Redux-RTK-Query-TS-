import { Button } from '@shared/ui/Button'
import { LoaderBtn } from '@shared/ui/loaderBtn/LoaderBtn'
import styles from './PizzaDialog.module.css'

interface PizzaDialogFooterProps {
	handleAddToCart: () => void
	isLoading: boolean
	price: number
}

export const PizzaDialogFooter = ({
	handleAddToCart,
	isLoading,
	price
}: PizzaDialogFooterProps) => (
	<div className={`${styles.dialogFooter} flexBetween`}>
		<Button
			className={`${styles.dialogCloseBtn} button`}
			onClick={handleAddToCart}
			aria-label={`Добавить в корзину товар за ${price} рублей`}
			disabled={isLoading}
			autoFocus
		>
			{isLoading ? <LoaderBtn /> : `в Корзину за ${price} ₽`}
		</Button>
	</div>
)
