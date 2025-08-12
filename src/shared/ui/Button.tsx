import type { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
	className?: string
	disabled?: boolean
	onClick?: MouseEventHandler<HTMLButtonElement>
	children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({
	className = '',
	disabled = false,
	onClick,
	children,
	...rest
}) => {
	return (
		<button
			className={className}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	)
}
