import type { Cart } from '@entities/cart/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_TIMEOUT = parseInt(import.meta.env.REACT_APP_API_TIMEOUT || '10000')

const validateQuantity = (quantity: number): boolean => {
	return Number.isInteger(quantity) && quantity > 0 && quantity <= 100
}

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: headers => {
			headers.set('Content-Type', 'application/json')
			return headers
		},
		timeout: API_TIMEOUT
	}),
	tagTypes: ['Cart'],
	endpoints: builder => ({
		getCart: builder.query<Cart[], void>({
			query: () => 'cart',
			providesTags: ['Cart']
		}),

		addToCart: builder.mutation<Cart, Cart>({
			query: body => ({
				url: 'cart',
				method: 'POST',
				body
			}),
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
