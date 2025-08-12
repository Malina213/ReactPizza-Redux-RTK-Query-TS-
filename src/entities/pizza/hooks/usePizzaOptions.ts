import { useState, useMemo, useCallback } from 'react'
import type { PizzaDough, PizzaSize } from '../types'
import { sizeMultiplier } from '../data'

export function usePizzaOptions(basePrice: number) {
	const [selectedDough, setSelectedDough] = useState<PizzaDough>('thin')
	const [selectedSize, setSelectedSize] = useState<PizzaSize>('30')

	const computedPrice = useMemo(() => {
		return Math.round(basePrice * (sizeMultiplier[selectedSize] ?? 1))
	}, [basePrice, selectedSize])

	const handleDoughChange = useCallback(
		(value: PizzaDough) => setSelectedDough(value),
		[]
	)
	const handleSizeChange = useCallback(
		(value: PizzaSize) => setSelectedSize(value),
		[]
	)

	return {
		selectedDough,
		selectedSize,
		computedPrice,
		handleDoughChange,
		handleSizeChange
	}
}
