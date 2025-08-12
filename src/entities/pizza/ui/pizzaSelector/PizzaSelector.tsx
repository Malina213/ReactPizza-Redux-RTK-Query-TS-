import type { RadioOption } from '@entities/pizza/types'
import styles from './PizzaSelector.module.css'

interface RadioSelectorProps<T extends string> {
	name: string
	options: RadioOption<T>[]
	selectedValue: T
	onChange: (value: T) => void
}

export function PizzaSelector<T extends string>({
	name,
	options,
	selectedValue,
	onChange
}: RadioSelectorProps<T>) {
	return (
		<div className={styles.radioInputs}>
			{options.map(option => (
				<label key={String(option.value)} className={styles.radio}>
					<input
						type='radio'
						name={name}
						value={String(option.value)}
						checked={selectedValue === option.value}
						onChange={() => onChange(option.value)}
					/>
					<span className={styles.name}>{option.label}</span>
				</label>
			))}
		</div>
	)
}
