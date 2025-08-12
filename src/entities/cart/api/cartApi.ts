import type { Cart } from '@entities/cart/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AddToCartRequest } from 'types'

const BASE_URL = 'https://679231bbcf994cc68049167c.mockapi.io/'

// Валидация данных корзины
const validateCartItem = (item: AddToCartRequest): boolean => {
	return (
		typeof item.name === 'string' &&
		item.name.length > 0 &&
		item.name.length <= 200 &&
		typeof item.imageUrl === 'string' &&
		item.imageUrl.length > 0 &&
		typeof item.dough === 'string' &&
		item.dough.length > 0 &&
		typeof item.size === 'string' &&
		item.size.length > 0 &&
		typeof item.price === 'number' &&
		item.price > 0 &&
		typeof item.quantity === 'number' &&
		item.quantity > 0 &&
		item.quantity <= 100
	)
}

const validateQuantity = (quantity: number): boolean => {
	return Number.isInteger(quantity) && quantity > 0 && quantity <= 100
}

const csrfToken = document
	.querySelector('meta[name="csrf-token"]')
	?.getAttribute('content')

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: headers => {
			headers.set('Content-Type', 'application/json')
			if (csrfToken) {
				headers.set('X-CSRF-Token', csrfToken)
			}
			return headers
		}
	}),
	tagTypes: ['Cart'],
	endpoints: builder => ({
		getCart: builder.query<Cart[], void>({
			query: () => ({
				url: 'cart',
				method: 'GET'
			}),
			providesTags: ['Cart']
		}),

		addToCart: builder.mutation<Cart, AddToCartRequest>({
			query: body => {
				if (!validateCartItem(body)) {
					throw new Error('Invalid cart item data')
				}

				return {
					url: 'cart',
					method: 'POST',
					body
				}
			},
			invalidatesTags: ['Cart']
		}),

		updateCartItemQuantity: builder.mutation<
			Cart,
			{ id: string; quantity: number }
		>({
			query: ({ id, quantity }) => {
				if (!id || typeof id !== 'string' || !validateQuantity(quantity)) {
					throw new Error('Invalid quantity or item ID')
				}

				return {
					url: `cart/${encodeURIComponent(id)}`,
					method: 'PUT',
					body: { quantity }
				}
			},
			invalidatesTags: ['Cart'],
			async onQueryStarted({ id, quantity }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					cartApi.util.updateQueryData('getCart', undefined, draft => {
						const item = draft.find(i => i.id === id)
						if (item) {
							item.quantity = quantity
						}
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			}
		}),

		removeFromCart: builder.mutation<void, string>({
			query: id => {
				if (!id || typeof id !== 'string') throw new Error('Invalid item ID')

				return {
					url: `cart/${encodeURIComponent(id)}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: ['Cart']
		})
	})
})

export const {
	useAddToCartMutation,
	useGetCartQuery,
	useUpdateCartItemQuantityMutation,
	useRemoveFromCartMutation
} = cartApi
