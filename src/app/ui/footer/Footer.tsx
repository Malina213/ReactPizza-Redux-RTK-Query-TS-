import { FooterContacts } from './footerContacts/FooterContacts'
import { FooterSocialLinks } from './footerSocialLinks/FooterSocialLinks'
import { FooterOrganization } from './footerOrganization/FooterOrganization'
import styles from './Footer.module.css'
export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={`${styles.footerInner} container`}>
				<div className={styles.footerTop}>
					<FooterContacts />
					<FooterSocialLinks />
				</div>
				<FooterOrganization />
			</div>
		</footer>
	)
}
