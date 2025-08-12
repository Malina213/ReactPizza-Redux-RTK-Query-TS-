import { type Dispatch, type SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FormModal } from './FormModal'
import { usePromoCallbacks } from '@entities/promo/hooks/usePromoCallbacksParams'
import type { RootState } from '@app/store/store'
import styles from './PromoModal.module.css'

interface PromoModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const PromoModal = ({ isOpen, setIsOpen }: PromoModalProps) => {
	const dispatch = useDispatch()
	const message = useSelector((state: RootState) => state.promo.message)
	const usedCodes = useSelector((state: RootState) => state.promo.usedCodes)

	const { usedPromoCode, handleClose } = usePromoCallbacks({
		usedCodes,
		dispatch,
		setIsOpen
	})

	return (
		<Dialog open={isOpen} onClose={handleClose} className={styles.dialogRoot}>
			<div className={styles.dialogOverlay}>
				<DialogPanel className={styles.dialogPanel}>
					<div className={styles.dialogPanelInner}>
						<div className={styles.dialogPanelRight}>
							<div className={styles.dialogPanelText}>
								<DialogTitle className={`${styles.dialogTitle} h3`}>
									Введите промокод
								</DialogTitle>
								<FormModal usedPromoCode={usedPromoCode} />
								{message && <p className={styles.promoMessage}>{message}</p>}
							</div>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	)
}
