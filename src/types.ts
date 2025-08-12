export interface PizzaSizeOption {
	value: string
	label: string
	price: number
}

export interface AddToCartRequest {
	name: string
	imageUrl: string
	dough: string
	size: string
	price: number
	quantity: number
}

export interface PromoCode {
	code: string
	discountPercent: number
	description: string
}

export type SortValue = '' | 'alphabet-asc' | 'price-asc' | 'price-desc'
export type PizzaSize = '30' | '35' | '40'
export type PizzaDough = 'thin' | 'traditional'
