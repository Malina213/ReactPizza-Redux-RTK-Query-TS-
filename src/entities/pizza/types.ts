export interface Nutrition {
	calories: number
	protein: number
	fat: number
	carbohydrates: number
	weight: number
}
export interface PizzaOptions<T extends string> {
	value: T
	label: string
}
export interface Pizza {
	category: string
	id: number
	imageUrl: string
	price: number
	name: string
	desc: string
	nutrition: Nutrition
	doughOptions: string[]
}
export interface FiltersState {
	category: string
	sort: string
}
export type PizzaSize = '30' | '35' | '40'
export type PizzaDough = 'thin' | 'traditional'

export interface PizzaApiResponse {
	data: Pizza[]
	total: number
	page: number
	limit: number
}
