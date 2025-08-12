import { Dialog, DialogPanel } from '@headlessui/react'
import { PizzaDialogContent } from './PizzaDialogContent'
import styles from './PizzaDialog.module.css'
import type { Nutrition } from '@entities/pizza/types'

interface PizzaDialogProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	name: string
	imageUrl: string
	desc: string
	price: number
	nutrition: Nutrition
}

export const PizzaDialog = ({
	isOpen,
	setIsOpen,
	name,
	imageUrl,
	desc,
	price,
	nutrition
}: PizzaDialogProps) => {
	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className={styles.dialogRoot}
		>
			<div className={styles.dialogOverlay}>
				<DialogPanel className={styles.dialogPanel}>
					<PizzaDialogContent
						name={name}
						imageUrl={imageUrl}
						desc={desc}
						price={price}
						nutrition={nutrition}
						closeDialog={() => setIsOpen(false)}
					/>
				</DialogPanel>
			</div>
		</Dialog>
	)
}
