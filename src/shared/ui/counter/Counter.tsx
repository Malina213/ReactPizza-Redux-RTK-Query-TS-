import { HiOutlineMinusSmall } from 'react-icons/hi2'
import { GoPlus } from 'react-icons/go'
import React from 'react'
import { Button } from '..'
import styles from './Counter.module.css'

interface CounterCartProps {
	quantity: number
	onIncrement: () => Promise<void>
	onDecrement: () => Promise<void>
	disabled?: boolean
}

export const Counter = React.memo(
	({
		quantity,
		onIncrement,
		onDecrement,
		disabled = false
	}: CounterCartProps) => {
		const handleIncrement = async () => {
			if (!disabled) {
				try {
					await onIncrement()
				} catch (error) {
					console.error('Ошибка при увеличении количества:', error)
				}
			}
		}

		const handleDecrement = async () => {
			if (!disabled && quantity > 1) {
				try {
					await onDecrement()
				} catch (error) {
					console.error('Ошибка при уменьшении количества:', error)
				}
			}
		}

		return (
			<div className={styles.cartItemCounter}>
				<Button
					className='flexCenter'
					onClick={handleDecrement}
					aria-label='Уменьшить счётчик на 1'
					disabled={quantity <= 1 || disabled}
				>
					<HiOutlineMinusSmall />
				</Button>
				<span>{quantity}</span>
				<Button
					className='flexCenter'
					onClick={handleIncrement}
					aria-label='Увеличить счётчик на 1'
					disabled={disabled}
				>
					<GoPlus />
				</Button>
			</div>
		)
	}
)
