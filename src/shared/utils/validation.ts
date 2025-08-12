export interface ValidationResult {
	isValid: boolean
	error?: string
	sanitizedValue: string
}

/**
 * Санитизация HTML и предотвращение XSS
 */
export const sanitizeHTML = (input: string): string => {
	if (typeof input !== 'string') return ''

	return input
		.replace(/[<>"'\\]/g, '') // удаляет опасные символы
		.replace(/javascript:/gi, '') // удаляет javascript: (в разных регистрах)
		.replace(/on\w+=/gi, '') // удаляет обработчики событий onclick=, onmouseover= и пр.
		.replace(/data:/gi, '') // удаляет data:
		.trim()
		.slice(0, 1000) // ограничение длины
}
/**
 *
 * Валидация промокода
 */
export const validatePromoCode = (code: string): ValidationResult => {
	const sanitized = sanitizeHTML(code)

	if (!sanitized) {
		return {
			isValid: false,
			error: 'Промокод не может быть пустым',
			sanitizedValue: ''
		}
	}

	if (sanitized.length < 3 || sanitized.length > 20) {
		return {
			isValid: false,
			error: 'Промокод должен содержать от 3 до 20 символов',
			sanitizedValue: sanitized
		}
	}

	const promoPattern = /^[A-Z0-9-_]+$/
	if (!promoPattern.test(sanitized.toUpperCase())) {
		return {
			isValid: false,
			error:
				'Промокод может содержать только буквы, цифры, дефисы и подчеркивания',
			sanitizedValue: sanitized
		}
	}

	return {
		isValid: true,
		sanitizedValue: sanitized.toUpperCase()
	}
}
