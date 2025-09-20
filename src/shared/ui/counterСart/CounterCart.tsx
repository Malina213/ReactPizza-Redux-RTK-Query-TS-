import { HiOutlineMinusSmall } from 'react-icons/hi2'
import { GoPlus } from 'react-icons/go'
import React from 'react'
import { Button, LoaderBtn } from '..'
import styles from './CounterCart.module.css'

interface CounterCartProps {
	quantity: number
	onIncrement: () => Promise<void>
	onDecrement: () => Promise<void>
	disabled?: boolean
	isLoading: boolean
}

export const CounterCart = React.memo(
	({ quantity, onIncrement, onDecrement, isLoading }: CounterCartProps) => {
		return (
			<div className={styles.cartItemCounter}>
				<Button
					className='flexCenter'
					onClick={onDecrement}
					aria-label='Уменьшить счётчик на 1'
					disabled={quantity <= 1 || isLoading}
				>
					<HiOutlineMinusSmall />
				</Button>
				<span>{isLoading ? <LoaderBtn /> : quantity}</span>
				<Button
					className='flexCenter'
					onClick={onIncrement}
					aria-label='Увеличить счётчик на 1'
					disabled={isLoading}
				>
					<GoPlus />
				</Button>
			</div>
		)
	}
)

CounterCart.displayName = 'CounterCart'
