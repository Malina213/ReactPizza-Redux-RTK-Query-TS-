import { DataLoaderWrapper } from '@shared/ui/dataLoaderWrapper/DataLoaderWrapper'
import { CartItem } from '@entities/cart/ui/cartItem/CartItem'
import { Empty } from '@shared/ui/empty/Empty'
import { useGetCartQuery } from '@entities/cart/api/cartApi'

export const CartList = () => {
	const { data: cartItems = [], isLoading, isError } = useGetCartQuery()
	return (
		<DataLoaderWrapper isLoading={isLoading} error={isError}>
			{cartItems.length > 0 ? (
				<ul className='cartContainer'>
					{cartItems.map(item => (
						<CartItem key={`${item.id}_${item.dough}_${item.size}`} {...item} />
					))}
				</ul>
			) : (
				<Empty />
			)}
		</DataLoaderWrapper>
	)
}
