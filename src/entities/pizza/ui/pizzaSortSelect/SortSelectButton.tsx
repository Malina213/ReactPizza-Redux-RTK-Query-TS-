import { ListboxButton } from '@headlessui/react'
import { GoChevronDown } from 'react-icons/go'
import styles from './PizzaSortSelect.module.css'
import { sortOptions } from '@entities/pizza/data'
interface SortSelectButtonProps {
	value: string
}
export const SortSelectButton = ({ value }: SortSelectButtonProps) => {
	const label =
		sortOptions.find(option => option.value === value)?.label ||
		'Выберите сортировку'
	return (
		<ListboxButton
			className={styles.listboxButton}
			aria-label='Сортировка по цене'
		>
			{label}
			<GoChevronDown className={styles.listboxArrow} />
		</ListboxButton>
	)
}
