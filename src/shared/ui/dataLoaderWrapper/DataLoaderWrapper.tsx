import type { ReactNode } from 'react'
import { Loader } from '@shared/ui/loader/Loader'
import { Error } from '@shared/ui/error/Error'

interface DataLoaderWrapperProps {
	isLoading: boolean
	error: unknown
	children: ReactNode
}

export const DataLoaderWrapper = ({
	isLoading,
	error,
	children
}: DataLoaderWrapperProps) => {
	if (isLoading) return <Loader />
	if (error)
		return (
			<Error message={typeof error === 'string' ? error : 'Ошибка загрузки'} />
		)
	return <>{children}</>
}
