import logoSvg from '@public/img/svg/pizza-logo.svg'
import { IoCartOutline } from 'react-icons/io5'
import { RiMoneyEuroBoxLine } from 'react-icons/ri'
import { useState, useMemo } from 'react'
import { Button } from '@shared/ui/Button'
import { CustomLink } from '@shared/ui/customLink/CustomLink'
import { PromoModal } from '@entities/promo/ui/promoModal/PromoModal'
import { useGetCartQuery } from '@entities/cart/api/cartApi'
import { ThemeToggle } from '@entities/theme/ui/themeToggle/ThemeToggle'
import { useLocation } from 'react-router'
import styles from './Header.module.css'

export const Header = () => {
	const { data: cartItems = [] } = useGetCartQuery()
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation()
	console.log('Header')

	const cartItemsCount = useMemo(() => cartItems.length, [cartItems])
	const isCartPage = location.pathname === '/cart'

	return (
		<>
			<header className={styles.header}>
				<div className={`${styles.headerInner} container flexBetween`}>
					<CustomLink
						to='/'
						className={styles.headerLogo}
						aria-label='На главную'
					>
						<img width={38} height={38} src={logoSvg} alt='Логотип Pizza' />
						<h1 className={styles.headerTitle}>React DODO</h1>
					</CustomLink>
					<div className={`${styles.headerRight}`}>
						<ThemeToggle />
						{!isCartPage ? (
							<CustomLink
								to='/cart'
								className={`${styles.headerCartButton} button`}
								aria-label='Перейти в корзину'
							>
								<IoCartOutline size={20} className={styles.headerCartIcon} />
								<span className={styles.headerCartText}>Корзина</span>
								{cartItemsCount > 0 && (
									<>
										<span className={styles.headerCartDelimiter}></span>
										<span className={styles.headerCartCount}>
											{cartItemsCount}
										</span>
									</>
								)}
							</CustomLink>
						) : (
							<Button
								onClick={() => setIsOpen(true)}
								className={`${styles.promoButton} button`}
								aria-label='Открыть поле для промокодов'
								disabled={cartItemsCount === 0}
							>
								<RiMoneyEuroBoxLine size={22} />
								<span>У вас есть промокод?</span>
							</Button>
						)}
					</div>
				</div>
			</header>
			{isOpen && <PromoModal isOpen={isOpen} setIsOpen={setIsOpen} />}
		</>
	)
}
