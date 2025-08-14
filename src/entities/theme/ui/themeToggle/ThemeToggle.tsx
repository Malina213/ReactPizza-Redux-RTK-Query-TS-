import { useTheme } from '@entities/theme/model/ThemeProvider'
import { CustomInput } from '@shared/ui'
import { AiOutlineMoon } from 'react-icons/ai'
import { CiSun } from 'react-icons/ci'
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme()
	return (
		<label className={styles.theme}>
			<CustomInput
				type='checkbox'
				className={styles.input}
				checked={theme === 'sun'}
				onChange={() => toggleTheme()}
			/>
			{theme === 'sun' ? <CiSun size={40} /> : <AiOutlineMoon size={40} />}
		</label>
	)
}
