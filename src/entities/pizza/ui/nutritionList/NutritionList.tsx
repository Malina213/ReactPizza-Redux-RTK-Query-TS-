import { NutritionItem } from '@entities/pizza/ui/nutritionItem/NutritionItem'
import type { Nutrition } from '@entities/pizza/types'
import styles from './NutritionList.module.css'

interface NutritionListProps {
	nutrition: Nutrition
}

export const NutritionList = ({ nutrition }: NutritionListProps) => (
	<div className={styles.nutritionContent}>
		<h5 className={styles.nutritionTitle}>
			Пищевая ценность на {nutrition.weight} г
		</h5>
		<dl className={styles.nutritionList}>
			<NutritionItem
				label='Энерг. ценность'
				value={`${nutrition.calories} ккал`}
			/>
			<NutritionItem label='Белки' value={`${nutrition.protein} г`} />
			<NutritionItem label='Жиры' value={`${nutrition.fat} г`} />
			<NutritionItem label='Углеводы' value={`${nutrition.carbohydrates} г`} />
		</dl>
	</div>
)
