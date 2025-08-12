import type { FiltersState, Pizza } from '@entities/pizza/types'
import { useMemo } from 'react'

export const useFilteredPizzas = (
	pizzas: Pizza[] | undefined,
	filters: FiltersState
): Pizza[] => {
	return useMemo(() => {
		if (!pizzas || pizzas.length === 0) return []

		const categoryFiltered =
			filters.category && filters.category !== 'Выбрать'
				? pizzas.filter(p => p.category === filters.category)
				: pizzas

		const sortedArray = [...categoryFiltered]

		const sortFunctions: Record<string, (a: Pizza, b: Pizza) => number> = {
			'alphabet-asc': (a, b) =>
				a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' }),
			'alphabet-desc': (a, b) =>
				b.name.localeCompare(a.name, 'ru', { sensitivity: 'base' }),
			'price-asc': (a, b) => a.price - b.price,
			'price-desc': (a, b) => b.price - a.price
		}

		if (filters.sort && sortFunctions[filters.sort])
			sortedArray.sort(sortFunctions[filters.sort])

		return sortedArray
	}, [pizzas, filters.category, filters.sort])
}
