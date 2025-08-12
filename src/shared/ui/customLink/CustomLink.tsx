import { Link } from 'react-router'

interface UniversalLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	to?: string
	href?: string
	children: React.ReactNode
	className?: string
}
export const CustomLink: React.FC<UniversalLinkProps> = ({
	to,
	href,
	children,
	className,
	...rest
}) => {
	if (to) {
		return (
			<Link to={to} className={className} {...rest}>
				{children}
			</Link>
		)
	}
	return (
		<a href={href || to} className={className} {...rest}>
			{children}
		</a>
	)
}
