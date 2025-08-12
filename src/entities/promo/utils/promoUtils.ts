export default function tryAddPromoCode(
	usedCode: string[],
	code: string
): { updatedCodes: string[]; added: boolean } {
	const codeUpper = code.toUpperCase()
	if (!usedCode.includes(codeUpper)) {
		return { updatedCodes: [...usedCode, codeUpper], added: true }
	}
	return { updatedCodes: usedCode, added: false }
}
