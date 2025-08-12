import type { FiltersState } from '@entities/pizza/types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react'

const initialState: FiltersState = {
	category: 'Выбрать',
	sort: ''
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		updateFilters(state, action: PayloadAction<Partial<FiltersState>>) {
			Object.assign(state, action.payload)
		},

		setFilters(_state, action: PayloadAction<FiltersState>) {
			return action.payload
		}
	}
})

export const { setFilters, updateFilters } = filtersSlice.actions
export default filtersSlice.reducer
