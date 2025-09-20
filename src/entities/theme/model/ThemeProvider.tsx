import {
	useEffect,
	useState,
	createContext,
	useContext,
	type ReactNode
} from 'react'

interface ThemeContextType {
	theme: string
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem('theme') || 'sun'
	)

	useEffect(() => {
		if (theme === 'sun') {
			document.documentElement.classList.remove('dark')
		} else {
			document.documentElement.classList.add('dark')
		}
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'sun' ? 'moon' : 'sun'))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme должен использоваться внутри ThemeProvider')
	}
	return context
}
