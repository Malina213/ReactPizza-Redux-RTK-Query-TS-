import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../store/slices/filterSlices'
import promoSlice from './slices/promoSlice'
import { pizzaApi } from '@entities/pizza/api/pizzaApi'
import { cartApi } from '@entities/cart/api/cartApi'

export const store = configureStore({
	reducer: {
		[pizzaApi.reducerPath]: pizzaApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		filters: filtersReducer,
		promo: promoSlice
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(pizzaApi.middleware, cartApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
