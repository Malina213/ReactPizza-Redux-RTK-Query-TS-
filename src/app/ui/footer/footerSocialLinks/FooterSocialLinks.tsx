import { CustomLink } from '@shared/ui'
import { FaInstagram } from 'react-icons/fa'
import { IoLogoTwitter } from 'react-icons/io'
import { FaWhatsapp } from 'react-icons/fa'
import styles from './FooterSocialLinks.module.css'

export const FooterSocialLinks = () => (
	<div className={styles.footerSocialLinks}>
		<CustomLink
			href='#'
			className={`${styles.socialContainer} ${styles.transitionDuration} ${styles.containerOne}`}
			aria-label='Перейти в Instagram'
		>
			<FaInstagram className={styles.socialSvg} />
		</CustomLink>
		<CustomLink
			href='#'
			className={`${styles.socialContainer} ${styles.transitionDuration} ${styles.containerTwo}`}
			aria-label='Перейти в Twitter'
		>
			<IoLogoTwitter className={styles.socialSvg} />
		</CustomLink>
		<CustomLink
			href='#'
			className={`${styles.socialContainer} ${styles.transitionDuration} ${styles.containerFour}`}
			aria-label='Перейти в WhatsApp'
		>
			<FaWhatsapp className={styles.socialSvg} />
		</CustomLink>
	</div>
)
