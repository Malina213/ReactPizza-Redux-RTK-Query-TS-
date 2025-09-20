import { useState, useMemo, useEffect } from 'react'
import { useFilteredPizzas } from '@features/filters/hooks/useFilteredPizzas'
import type { FiltersState, Pizza } from '../types'
import { useGetPizzasQuery } from '../api/pizzaApi'

interface UsePaginationPizzasReturn {
	pizzasOnPage: Pizza[]
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	totalPages: number
	isLoading: boolean
	error: unknown
	isFetching: boolean
}

const ITEMS_PER_PAGE = 10

export const usePaginationPizzas = (
	filters: FiltersState,
	allPizzasLimit = 1000
): UsePaginationPizzasReturn => {
	const [page, setPage] = useState(1)

	const {
		data: pizzas = [],
		error,
		isLoading,
		isFetching
	} = useGetPizzasQuery({
		page: 1,
		limit: allPizzasLimit
	})

	const filteredPizzas = useFilteredPizzas(pizzas, filters)

	const totalPages = useMemo(
		() => Math.ceil(filteredPizzas.length / ITEMS_PER_PAGE),
		[filteredPizzas]
	)
	const pizzasOnPage = useMemo(() => {
		const start = (page - 1) * ITEMS_PER_PAGE
		return filteredPizzas.slice(start, start + ITEMS_PER_PAGE)
	}, [filteredPizzas, page])

	useEffect(() => {
		setPage(1)
	}, [filters])

	return {
		pizzasOnPage,
		page,
		setPage,
		totalPages,
		isLoading,
		error,
		isFetching
	}
}
