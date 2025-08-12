import type { Cart } from '@entities/cart/types'

export function calculateCartTotal(cartItems: Cart[]): number {
	return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function calculateCartQuantity(cartItems: Cart[]): number {
	return cartItems.reduce((total, item) => total + item.quantity, 0)
}
