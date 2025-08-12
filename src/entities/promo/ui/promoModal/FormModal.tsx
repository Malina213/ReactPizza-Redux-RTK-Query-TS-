import React, { useState, type FormEvent } from 'react'
import { Button } from '@shared/ui/Button'
import { FiChevronRight } from 'react-icons/fi'
import { validatePromoCode } from '@shared/utils/validation'
import { CustomInput } from '@shared/ui/Input/Input'
import styles from './PromoModal.module.css'

interface FormModalProps {
	usedPromoCode: (value: string) => { text: string; success: boolean }
}

export const FormModal: React.FC<FormModalProps> = ({ usedPromoCode }) => {
	const [promo, setPromo] = useState('')
	const [error, setError] = useState<string | null>(null)

	const handleChange = (value: string) => {
		setPromo(value)

		if (value.trim()) {
			const validation = validatePromoCode(value)
			if (!validation.isValid) {
				setError(validation.error || null)
			} else {
				setError(null)
			}
		} else {
			setError(null)
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		const validation = validatePromoCode(promo)
		if (!validation.isValid) {
			setError(validation.error || null)
			return
		}

		const result = usedPromoCode(validation.sanitizedValue)
		if (result.success) {
			setPromo('')
			setError(null)
		}
	}

	return (
		<form className={styles.promoForm} onSubmit={handleSubmit}>
			<CustomInput
				type='text'
				placeholder='Промокод'
				value={promo}
				error={error}
				onChange={handleChange}
				className={styles.promoInput}
				pattern='[A-Z0-9_-]+'
			/>
			<Button
				type='submit'
				className={`${styles.promoButton} button`}
				disabled={!promo.trim() || !!error}
				aria-label='Применить промокод'
			>
				<FiChevronRight size={22} />
				<span>Применить</span>
			</Button>
		</form>
	)
}
