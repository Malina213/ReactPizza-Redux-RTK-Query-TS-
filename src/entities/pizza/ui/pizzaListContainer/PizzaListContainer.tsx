import { PizzaList } from '@entities/pizza/ui/pizzaList/PizzaList'
import { Pagination } from '@shared/ui/pagination/Pagination'
import { usePaginationPizzas } from '@entities/pizza/hooks/usePaginationPizzas'
import { DataLoaderWrapper } from '@shared/ui/dataLoaderWrapper/DataLoaderWrapper'
import { useSelector } from 'react-redux'
import type { RootState } from '@app/store/store'

export const PizzaListContainer = () => {
	const filters = useSelector((state: RootState) => state.filters)

	const {
		pizzasOnPage,
		page,
		setPage,
		totalPages,
		isLoading,
		error,
		isFetching
	} = usePaginationPizzas(filters)

	return (
		<DataLoaderWrapper isLoading={isLoading} error={error}>
			<PizzaList pizzas={pizzasOnPage} />
			{totalPages > 1 && (
				<Pagination
					currentPage={page}
					onPageChange={setPage}
					lastPage={totalPages}
					isLastPage={page === totalPages}
					isLoading={isFetching}
				/>
			)}
		</DataLoaderWrapper>
	)
}
