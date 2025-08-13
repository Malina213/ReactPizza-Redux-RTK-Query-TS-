import React, { type InputHTMLAttributes, useState, useCallback } from 'react'
import { sanitizeHTML } from '@shared/utils/validation'
import styles from './CustomInput.module.css'

interface CustomInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	className?: string
	onChange?: (value: string) => void
	validation?: (value: string) => { isValid: boolean; error?: string }
	maxLength?: number
	pattern?: string
	error?: string | null
}

export const CustomInput: React.FC<CustomInputProps> = ({
	className,
	onChange,
	validation,
	maxLength = 50,
	pattern,
	error: externalError,
	...rest
}) => {
	const [value, setValue] = useState('')
	const [internalError, setInternalError] = useState<string | null>(null)

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = sanitizeHTML(e.target.value).slice(0, maxLength)
			setValue(value)

			if (validation && value.trim()) {
				const { isValid, error } = validation(value)
				setInternalError(isValid ? null : error || 'Неверный формат')
			} else {
				setInternalError(null)
			}

			onChange?.(value)
		},
		[maxLength, onChange, validation]
	)

	const errorToShow = externalError ?? internalError

	return (
		<div className={styles.inputWrapper}>
			<input
				className={`${className || ''} ${errorToShow ? styles['input-error'] : ''}`}
				value={value}
				onChange={handleChange}
				maxLength={maxLength}
				pattern={pattern}
				{...rest}
			/>
			{errorToShow && (
				<span className={styles['input-error-message']}>{errorToShow}</span>
			)}
		</div>
	)
}
