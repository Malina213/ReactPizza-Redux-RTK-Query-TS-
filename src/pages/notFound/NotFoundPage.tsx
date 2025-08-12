import { CustomLink } from '@shared/ui/customLink/CustomLink'
import styles from './NotFoundPage.module.css'

export const NotFoundPage = () => {
	return (
		<section className={styles.notFound}>
			<h2 className='visually-hidden'>404 ошибка</h2>
			<div className='container'>
				<div className={styles.content}>
					<span className={styles.title}>404</span>
					<p className={styles.subtitle}>Страница не найдена</p>
					<p className={styles.description}>
						Извините, запрашиваемая страница не существует.
					</p>
					<CustomLink to='/' className={styles.link}>
						Вернуться на главную
					</CustomLink>
				</div>
			</div>
		</section>
	)
}
