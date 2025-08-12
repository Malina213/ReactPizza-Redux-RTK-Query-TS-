import { ListboxOption, ListboxOptions } from '@headlessui/react'
import styles from './Categories.module.css'
import type { Category } from './types'

interface CategoriesOptionsProps {
	categories: Category[]
}
export const CategoriesOptions = ({ categories }: CategoriesOptionsProps) => (
	<ListboxOptions className={styles.listboxOptions}>
		{categories.map(category => (
			<ListboxOption
				key={category}
				value={category}
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
				{category}
			</ListboxOption>
		))}
	</ListboxOptions>
)
