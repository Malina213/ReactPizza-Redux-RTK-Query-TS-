import { useCallback, type Dispatch, type SetStateAction } from 'react'
import { usedPromo, clearMessage } from '@app/store/slices/promoSlice'
import type { AppDispatch } from '@app/store/store'
import { promoCodes } from '../data'

interface UsePromoCallbacksParams {
	usedCodes: string[]
	dispatch: AppDispatch
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const usePromoCallbacks = ({
	usedCodes,
	dispatch,
	setIsOpen
}: UsePromoCallbacksParams) => {
	const usedPromoCode = useCallback(
		(code: string) => {
			const upperCode = code.trim().toUpperCase()

			if (usedCodes.includes(upperCode)) {
				const message = `Промокод "${code}" уже был применён.`
				dispatch(usedPromo({ code: upperCode, discountPercent: 0, message }))
				return { text: message, success: false }
			}

			const promoItem = promoCodes.find(
				el => el.code.toUpperCase() === upperCode
			)

			if (promoItem) {
				const message = `Промокод применён! ${promoItem.description}`
				dispatch(
					usedPromo({
						code: upperCode,
						discountPercent: promoItem.discountPercent,
						message
					})
				)
				return { text: message, success: true }
			}

			const message = 'Неверный промокод. Попробуйте ещё раз.'
			dispatch(usedPromo({ code: '', discountPercent: 0, message }))
			return { text: message, success: false }
		},
		[usedCodes, dispatch]
	)

	const handleClose = useCallback(() => {
		dispatch(clearMessage())
		setIsOpen(false)
	}, [dispatch, setIsOpen])

	return { usedPromoCode, handleClose }
}
