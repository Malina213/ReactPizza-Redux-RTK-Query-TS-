import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Router } from './routes/Router'
import { store } from './store/store'
import { ThemeProvider } from '@entities/theme/model/ThemeProvider'

import '@assets/style/main.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<Provider store={store}>
				<Router />
			</Provider>
		</ThemeProvider>
	</StrictMode>
)
