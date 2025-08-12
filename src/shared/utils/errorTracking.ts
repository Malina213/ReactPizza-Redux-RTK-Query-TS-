/**
 * Система отслеживания ошибок
 */

export interface ErrorContext {
	userId?: string
	page?: string
	action?: string
	[key: string]: unknown
}

interface ErrorData {
	error: Error
	context?: ErrorContext
	timestamp: number
}

// Fallback error tracking если Sentry не настроен
class FallbackErrorTracker {
	private errors: ErrorData[] = []

	captureException(error: Error, context?: ErrorContext) {
		const errorData: ErrorData = {
			error,
			context,
			timestamp: Date.now()
		}

		this.errors.push(errorData)

		// В development режиме показываем в консоли
		if (process.env.NODE_ENV === 'development') {
			console.error('Error tracked:', errorData)
		}

		// В production можно отправлять на сервер
		if (process.env.NODE_ENV === 'production') {
			this.sendToServer(errorData)
		}
	}

	private async sendToServer(errorData: ErrorData) {
		try {
			await fetch('/api/errors', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(errorData)
			})
		} catch {
			// Fallback - сохраняем в localStorage
			this.saveToLocalStorage(errorData)
		}
	}

	private saveToLocalStorage(errorData: ErrorData) {
		try {
			const errors = JSON.parse(localStorage.getItem('app_errors') || '[]')
			errors.push(errorData)
			localStorage.setItem('app_errors', JSON.stringify(errors.slice(-50))) // Храним последние 50 ошибок
		} catch (error) {
			console.error('Failed to save error to localStorage:', error)
		}
	}

	getErrors() {
		return this.errors
	}

	clearErrors() {
		this.errors = []
	}
}

// Основной error tracker
let errorTracker: FallbackErrorTracker | null = null

export const initErrorTracking = () => {
	if (!errorTracker) {
		errorTracker = new FallbackErrorTracker()
	}

	// Глобальный error handler
	window.addEventListener('error', event => {
		if (errorTracker) {
			errorTracker.captureException(event.error, {
				page: window.location.pathname,
				userAgent: navigator.userAgent
			})
		}
	})

	// Unhandled promise rejections
	window.addEventListener('unhandledrejection', event => {
		if (errorTracker) {
			errorTracker.captureException(new Error(event.reason), {
				page: window.location.pathname,
				type: 'unhandled_rejection'
			})
		}
	})
}

export const trackError = (error: Error, context?: ErrorContext) => {
	if (!errorTracker) {
		console.error('Error tracking not initialized:', error, context)
		return
	}

	errorTracker.captureException(error, context)
}

export const getErrorTracker = () => errorTracker
