interface CartSummaryProps {
	totalQuantity: number
	totalCost: number
	discountPercent: number
	discountedTotal: number
}
export const CartSummary = ({
	totalQuantity,
	totalCost,
	discountPercent,
	discountedTotal
}: CartSummaryProps) => (
	<dl className={`cartContainer flexBetween`}>
		<div>
			<dt>Всего пицц:</dt>
			<dd>{totalQuantity} шт</dd>
		</div>
		<div>
			<dt>Сумма заказа:</dt>
			<dd>
				{discountPercent > 0 ? (
					<>
						<span style={{ textDecoration: 'line-through', marginRight: 8 }}>
							{totalCost.toFixed(2)}р
						</span>
						<span>{discountedTotal.toFixed(2)}р</span>
					</>
				) : (
					`${totalCost.toFixed(2)}р`
				)}
			</dd>
		</div>
	</dl>
)
