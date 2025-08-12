import type { PizzaDough, PizzaSize, PizzaOptions } from './types'

export const sortOptions: { value: string; label: string }[] = [
	{ value: '', label: 'Сортировать' },
	{ value: 'alphabet-asc', label: 'По алфавиту' },
	{ value: 'price-asc', label: 'Дешевле' },
	{ value: 'price-desc', label: 'Дороже' }
]
export const sizeMultiplier: Record<PizzaSize, number> = {
	'30': 1,
	'35': 1.2,
	'40': 1.7
}
export const doughOptions: PizzaOptions<PizzaDough>[] = [
	{ value: 'thin', label: 'Тонкое' },
	{ value: 'traditional', label: 'Традиционное' }
]

export const sizeOptions: PizzaOptions<PizzaSize>[] = [
	{ value: '30', label: '30 см' },
	{ value: '35', label: '35 см' },
	{ value: '40', label: '40 см' }
]
