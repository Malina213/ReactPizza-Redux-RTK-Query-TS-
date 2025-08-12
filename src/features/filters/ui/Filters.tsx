import { PizzaSortSelect } from '@entities/pizza/ui/pizzaSortSelect/PizzaSortSelect'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilters } from '@app/store/slices/filterSlices'
import type { RootState } from '@app/store/store'
import { Categories } from '@features/categories/ui/Categories'
import styles from './Filters.module.css'

export const Filters = () => {
	const filters = useSelector((state: RootState) => state.filters)
	const dispatch = useDispatch()

	const handleCategoryChange = (category: string) => {
		dispatch(updateFilters({ category }))
	}
	const handleSortChange = (sort: string) => {
		dispatch(updateFilters({ sort }))
	}

	return (
		<div className={`${styles.filters} flexBetween`}>
			<h3 className={`${styles.filterTitle} title`}>
				{filters.category === 'Выбрать' ? 'Все пиццы' : filters.category}
			</h3>
			<div className={styles.filtersBody}>
				<Categories value={filters.category} onChange={handleCategoryChange} />
				<PizzaSortSelect value={filters.sort} onChange={handleSortChange} />
			</div>
		</div>
	)
}
