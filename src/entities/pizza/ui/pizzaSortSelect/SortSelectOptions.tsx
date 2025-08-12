import { ListboxOption, ListboxOptions } from '@headlessui/react'
import styles from './PizzaSortSelect.module.css'
import { sortOptions } from '@entities/pizza/data'

export const SortSelectOptions = () => (
	<ListboxOptions className={styles.listboxOptions}>
		{sortOptions.map(option => (
			<ListboxOption
				key={option.value}
				value={option.value}
				className={({ selected, active }) =>
					[
						styles.option,
						active ? styles.optionActive : '',
						selected ? styles.optionSelected : ''
					]
						.filter(Boolean)
						.join(' ')
				}
			>
				{option.label}
			</ListboxOption>
		))}
	</ListboxOptions>
)
