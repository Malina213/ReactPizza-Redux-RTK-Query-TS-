import { ListboxButton } from '@headlessui/react'
import { GoChevronDown } from 'react-icons/go'
import styles from './Categories.module.css'

export const CategoriesButton = ({ value }: { value: string }) => (
	<ListboxButton
		className={styles.listboxButton}
		aria-label='Выберите категорию'
	>
		{value}
		<GoChevronDown className={styles.listboxArrow} />
	</ListboxButton>
)
