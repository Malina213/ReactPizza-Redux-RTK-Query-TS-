import { CustomLink } from '@shared/ui'
import styles from './FooterOrganization.module.css'

export const FooterOrganization: React.FC = () => (
	<div className={`${styles.footerOrganization} h5`}>
		<p>© {new Date().getFullYear()} Dodo Pizza. Все права защищены.</p>
		<p>ООО "Додо Пицца", ИНН 7701234567, г. Москва</p>
		<CustomLink href='#' className={styles.footerPrivacy}>
			Политика конфиденциальности
		</CustomLink>
	</div>
)
