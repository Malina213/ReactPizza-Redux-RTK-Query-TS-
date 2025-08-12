import { Listbox } from '@headlessui/react'
import { SortSelectButton } from './SortSelectButton'
import { SortSelectOptions } from './SortSelectOptions'
import styles from './PizzaSortSelect.module.css'

interface PizzaSortSelectProps {
	value: string
	onChange: (value: string) => void
}

export const PizzaSortSelect = ({ value, onChange }: PizzaSortSelectProps) => (
	<div className={styles.categories}>
		<Listbox value={value} onChange={onChange}>
			<SortSelectButton value={value} />
			<SortSelectOptions />
		</Listbox>
	</div>
)
