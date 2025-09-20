import { useCallback } from 'react'
import {
	useGetCartQuery,
	useRemoveFromCartMutation,
	useUpdateCartItemQuantityMutation
} from '../api/cartApi'
import { trackError } from '@shared/utils/errorTracking'

interface CartActionsProps {
	id: string
	quantity: number
}

export const useCartActions = () => {
	const { data: cartItems = [] } = useGetCartQuery()
	const [updateQuantity, { isLoading: isUpdating }] =
		useUpdateCartItemQuantityMutation()
	const [removeFromCart] = useRemoveFromCartMutation()

	const handleIncrement = useCallback(
		async (item: CartActionsProps) => {
			try {
				await updateQuantity({
					id: item.id,
					quantity: item.quantity + 1
				}).unwrap()
			} catch (error) {
				trackError(error as Error, {
					action: 'increment_cart_item',
					itemId: item.id,
					quantity: item.quantity,
					page: window.location.pathname
				})
			}
		},
		[updateQuantity]
	)

	const handleDecrement = useCallback(
		async (item: CartActionsProps) => {
			if (item.quantity > 1) {
				try {
					await updateQuantity({
						id: item.id,
						quantity: item.quantity - 1
					}).unwrap()
				} catch (error) {
					trackError(error as Error, {
						action: 'decrement_cart_item',
						itemId: item.id,
						quantity: item.quantity,
						page: window.location.pathname
					})
				}
			} else {
				try {
					await removeFromCart(item.id).unwrap()
				} catch (error) {
					trackError(error as Error, {
						action: 'remove_cart_item',
						itemId: item.id,
						page: window.location.pathname
					})
				}
			}
		},
		[updateQuantity, removeFromCart]
	)

	const handleRemove = useCallback(
		async (item: { id: string }) => {
			try {
				await removeFromCart(item.id).unwrap()
			} catch (error) {
				trackError(error as Error, {
					action: 'remove_cart_item',
					itemId: item.id,
					page: window.location.pathname
				})
			}
		},
		[removeFromCart]
	)

	const handleClearCart = useCallback(async () => {
		if (cartItems.length === 0) return
		try {
			for (const item of cartItems) {
				await removeFromCart(item.id).unwrap()
			}
		} catch (error) {
			trackError(error as Error, {
				action: 'clear_cart',
				itemsCount: cartItems.length,
				page: window.location.pathname
			})
		}
	}, [cartItems, removeFromCart])

	return {
		handleIncrement,
		handleDecrement,
		handleRemove,
		handleClearCart,
		isUpdating
	}
}
