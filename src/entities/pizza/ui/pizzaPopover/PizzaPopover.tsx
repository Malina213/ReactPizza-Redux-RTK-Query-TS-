import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { NutritionList } from '@entities/pizza/ui/nutritionList/NutritionList'
import type { Nutrition } from '@entities/pizza/types'
import styles from './PizzaPopover.module.css'

interface PizzaTooltipProps {
	nutrition: Nutrition
}
export const PizzaPopover = ({ nutrition }: PizzaTooltipProps) => {
	return (
		<Popover className={styles.tooltipRoot}>
			{({ open }) => (
				<>
					<PopoverButton
						className={styles.tooltipButton}
						aria-label='Пищевая ценность'
					>
						<AiOutlineQuestionCircle />
					</PopoverButton>
					<PopoverPanel
						className={`${styles.tooltipPanel} ${
							open ? styles.tooltipOpen : ''
						}`}
					>
						<NutritionList nutrition={nutrition} />
					</PopoverPanel>
				</>
			)}
		</Popover>
	)
}
