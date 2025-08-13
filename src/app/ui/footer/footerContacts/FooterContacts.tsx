import { CustomLink } from '@shared/ui'
import styles from './FooterContacts.module.css'

export const FooterContacts: React.FC = () => (
	<div className={styles.footerContacts}>
		<CustomLink href='tel:+78005555555'>8 800 555-55-55</CustomLink>
		<CustomLink href='mailto:info@dodopizza.ru'>info@dodopizza.ru</CustomLink>
	</div>
)
