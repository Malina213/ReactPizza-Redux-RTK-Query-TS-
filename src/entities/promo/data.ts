import type { PromoCode } from './types'

export const promoCodes: PromoCode[] = [
	{
		code: 'DISCOUNT10',
		discountPercent: 10,
		description: 'Скидка 10% на заказ'
	},
	{
		code: 'DISCOUNT15',
		discountPercent: 15,
		description: 'Скидка 15% для новых клиентов'
	},
	{
		code: 'WELCOME5',
		discountPercent: 5,
		description: 'Скидка 5% для новых клиентов'
	}
]
