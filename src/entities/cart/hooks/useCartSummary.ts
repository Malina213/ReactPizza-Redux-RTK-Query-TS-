import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import type { RootState } from '@app/store/store'
import type { Cart } from '../types'
import { calculateCartQuantity, calculateCartTotal } from '../utils/cartUtils'

export const useCartSummary = (cartItems: Cart[]) => {
	const discountPercent = useSelector(
		(state: RootState) => state.promo.discountPercent
	)

	const summary = useMemo(() => {
		const totalCost = calculateCartTotal(cartItems)
		const totalQuantity = calculateCartQuantity(cartItems)
		const discountedTotal = totalCost * (1 - discountPercent / 100)

		return {
			totalCost,
			totalQuantity,
			discountPercent,
			discountedTotal
		}
	}, [cartItems, discountPercent])

	return summary
}
