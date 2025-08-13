import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Button } from '..'
import styles from './Pagination.module.css'

interface PaginationProps {
	currentPage: number
	onPageChange: (page: number) => void
	isLastPage: boolean
	lastPage: number
	isLoading?: boolean
}

export const Pagination = ({
	currentPage,
	onPageChange,
	lastPage,
	isLastPage,
	isLoading
}: PaginationProps) => {
	const handlePrevPage = () => {
		const prevPage = Math.max(currentPage - 1, 1)
		onPageChange(prevPage)
	}
	const handleNextPage = () => onPageChange(currentPage + 1)

	return (
		<nav aria-label='Навигация' className={styles.container}>
			<Button
				className={`${styles.button} ${
					currentPage === 1 || isLoading ? styles.buttonDisabled : ''
				}`}
				onClick={handlePrevPage}
				disabled={currentPage === 1 || isLoading}
				aria-label='Предыдущая страница'
			>
				<FaAngleLeft size={30} />
			</Button>

			<span className={styles.pageInfo}>
				{currentPage === lastPage
					? currentPage
					: `${currentPage} / ${lastPage}`}
			</span>
			<Button
				className={`${styles.button} ${
					isLastPage || isLoading ? styles.buttonDisabled : ''
				}`}
				onClick={handleNextPage}
				disabled={isLastPage || isLoading}
				aria-label='Следующая страница'
			>
				<FaAngleRight size={30} />
			</Button>
		</nav>
	)
}
