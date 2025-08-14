import styles from './Empty.module.css'
import empty from '@public/img/empty.webp'

export const Empty = () => {
	return (
		<div className={styles.empty}>
			<h3 className={styles.emptyTitle}>Корзина пуста 😕</h3>
			<p className={`${styles.emptyDesc} h4`}>
				Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
				пиццу, перейди на главную страницу.
			</p>
			<img
				className={styles.emptyImg}
				width={500}
				height={355}
				src={empty}
				alt='Пустой каталог'
			/>
		</div>
	)
}
