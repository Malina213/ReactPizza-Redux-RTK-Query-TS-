import type { ReactNode } from 'react'
import { Loader, Error } from '..'

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
