import { DialogTitle } from '@headlessui/react'
import type { Nutrition } from '@entities/pizza/types'
import { doughOptions, sizeOptions } from '@entities/pizza/data'
import {
	useAddToCartMutation,
	useGetCartQuery,
	useUpdateCartItemQuantityMutation
} from '@entities/cart/api/cartApi'
import { PizzaPopover } from '../pizzaPopover/PizzaPopover'
import { PizzaDialogFooter } from './PizzaDialogFooter'
import { PizzaSelector } from '../pizzaSelector/PizzaSelector'
import { usePizzaOptions } from '@entities/pizza/hooks/usePizzaOptions'
import styles from './PizzaDialog.module.css'

interface PizzaDialogContentProps {
	name: string
	imageUrl: string
	desc: string
	price: number
	nutrition: Nutrition
	closeDialog: () => void
}

export const PizzaDialogContent = ({
	name,
	imageUrl,
	desc,
	price,
	nutrition,
	closeDialog
}: PizzaDialogContentProps) => {
	const {
		selectedDough,
		selectedSize,
		computedPrice,
		handleDoughChange,
		handleSizeChange
	} = usePizzaOptions(price)

	const { data: cartItems = [] } = useGetCartQuery()
	const [addToCart, { isLoading: isAdding }] = useAddToCartMutation()
	const [updateCartItemQuantity, { isLoading: isUpdating }] =
		useUpdateCartItemQuantityMutation()

	const isLoadingAny = isAdding || isUpdating

	const doughLabel =
		doughOptions.find(opt => opt.value === selectedDough)?.label ??
		selectedDough
	const sizeLabel =
		sizeOptions.find(opt => opt.value === selectedSize)?.label ?? selectedSize

	const handleAddToCart = async () => {
		try {
			const existingItem = cartItems.find(
				item =>
					item.name === name &&
					item.dough === doughLabel &&
					item.size === sizeLabel
			)

			if (existingItem) {
				await updateCartItemQuantity({
					id: existingItem.id,
					quantity: existingItem.quantity + 1
				}).unwrap()
			} else {
				await addToCart({
					name,
					imageUrl,
					dough: doughLabel,
					size: sizeLabel,
					price: computedPrice,
					quantity: 1,
					id: ''
				}).unwrap()
			}
			closeDialog()
		} catch (e) {
			console.error('Ошибка добавления в корзину:', e)
		}
	}

	return (
		<div className={styles.dialogPanelInner}>
			<div className={styles.dialogPanelLeft}>
				<img
					src={imageUrl}
					alt={name}
					className={styles.dialogImg}
					width={240}
				/>
			</div>
			<div className={styles.dialogPanelRight}>
				<div className={styles.dialogPanelText}>
					<DialogTitle className={styles.dialogTitle}>
						{name}
						<PizzaPopover nutrition={nutrition} />
					</DialogTitle>
					<p className={styles.dialogDescr}>{desc}</p>
					<div className={styles.dialogRadioSelector}>
						<PizzaSelector
							name='doughType'
							options={doughOptions}
							selectedValue={selectedDough}
							onChange={handleDoughChange}
						/>
						<PizzaSelector
							name='size'
							options={sizeOptions}
							selectedValue={selectedSize}
							onChange={handleSizeChange}
						/>
					</div>
				</div>
				<PizzaDialogFooter
					handleAddToCart={handleAddToCart}
					isLoading={isLoadingAny}
					price={computedPrice}
				/>
			</div>
		</div>
	)
}
