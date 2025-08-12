import { Listbox } from '@headlessui/react'
import { CategoriesButton } from './CategoriesButton'
import { CategoriesOptions } from './CategoriesOptions'
import { categories } from './constants'
import styles from './Categories.module.css'

interface CategoriesProps {
	value: string
	onChange: (value: string) => void
}

export function Categories({ value, onChange }: CategoriesProps) {
	return (
		<div className={styles.categories}>
			<Listbox value={value} onChange={onChange}>
				<CategoriesButton value={value} />
				<CategoriesOptions categories={categories} />
			</Listbox>
		</div>
	)
}
