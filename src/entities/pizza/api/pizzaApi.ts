import type { Pizza } from '@entities/pizza/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_TIMEOUT = parseInt(import.meta.env.REACT_APP_API_TIMEOUT || '10000')

export const pizzaApi = createApi({
	reducerPath: 'pizzaApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: headers => {
			headers.set('Content-Type', 'application/json')
			headers.set('X-Requested-With', 'XMLHttpRequest')
			return headers
		},
		timeout: API_TIMEOUT
	}),
	tagTypes: ['Pizzas'],
	endpoints: builder => ({
		getPizzas: builder.query<Pizza[], { page: number; limit: number }>({
			query: ({ page, limit }) => `items?page=${page}&limit=${limit}`
		})
	})
})

export const { useGetPizzasQuery } = pizzaApi
