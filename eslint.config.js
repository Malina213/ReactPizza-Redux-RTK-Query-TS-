import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config([
	globalIgnores(['dist']),
	{
		plugins: {
			reactHooks,
			import: importPlugin 
		},
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			sourceType: 'module',
			ecmaFeatures: {
				jsx: true
			}
		},
		rules: {
			// Ваше правило import/order:
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'unknown'
					],
					pathGroups: [
						{
							pattern: '*.css',
							group: 'unknown',
							position: 'after'
						},
						{
							pattern: '@ui/**',
							group: 'internal',
							position: 'before'
						},
						{
							pattern: '@hooks/**',
							group: 'internal',
							position: 'before'
						},
						{
							pattern: '@components/**',
							group: 'internal',
							position: 'before'
						}
					],
					pathGroupsExcludedImportTypes: ['builtin', 'external'],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					},
					'newlines-between': 'always'
				}
			]
		}
	}
])
