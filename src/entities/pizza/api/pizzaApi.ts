import type { Pizza } from '@entities/pizza/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://679231bbcf994cc68049167c.mockapi.io/'

export const pizzaApi = createApi({
	reducerPath: 'pizzaApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: headers => {
			headers.set('Content-Type', 'application/json')
			headers.set('X-Requested-With', 'XMLHttpRequest')
			return headers
		}
	}),
	tagTypes: ['Pizzas'],
	endpoints: builder => ({
		getPizzas: builder.query<Pizza[], { page: number; limit: number }>({
			query: ({ page, limit }) => `items?page=${page}&limit=${limit}`
		})
	})
})

export const { useGetPizzasQuery } = pizzaApi
