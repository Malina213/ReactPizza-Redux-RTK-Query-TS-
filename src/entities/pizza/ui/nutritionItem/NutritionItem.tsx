import styles from './NutritionItem.module.css'

interface NutritionItemProps {
	value: string
	label: string
}
export const NutritionItem = ({ label, value }: NutritionItemProps) => (
	<div className={styles.nutritionItem}>
		<dt>{label}</dt>
		<dd>{value}</dd>
	</div>
)
