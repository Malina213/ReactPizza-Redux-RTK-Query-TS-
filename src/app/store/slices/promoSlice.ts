import tryAddPromoCode from '@entities/promo/utils/promoUtils'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface PromoState {
	usedCodes: string[]
	discountPercent: number
	message: string | null
}

const initialState: PromoState = {
	usedCodes: [],
	discountPercent: 0,
	message: null
}

const promoSlice = createSlice({
	name: 'promo',
	initialState,
	reducers: {
		usedPromo(
			state,
			action: PayloadAction<{
				code: string
				discountPercent: number
				message: string
			}>
		) {
			const { updatedCodes, added } = tryAddPromoCode(
				state.usedCodes,
				action.payload.code
			)
			state.usedCodes = updatedCodes
			if (added) state.discountPercent = action.payload.discountPercent
			state.message = action.payload.message
		},
		clearPromo(state) {
			state.usedCodes = []
			state.discountPercent = 0
			state.message = null
		},
		clearMessage(state) {
			state.message = null
		}
	}
})

export const { usedPromo, clearPromo, clearMessage } = promoSlice.actions
export default promoSlice.reducer
