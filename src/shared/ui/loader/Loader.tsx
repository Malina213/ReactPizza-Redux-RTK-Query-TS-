import styles from './Loader.module.css'

export const Loader = () => (
	<div className={styles.hourglassBackground}>
		<div className={styles.hourglassContainer}>
			<div className={styles.hourglassCurves} />
			<div className={styles.hourglassCapTop} />
			<div className={styles.hourglassGlassTop} />
			<div className={styles.hourglassSand} />
			<div className={styles.hourglassSandStream} />
			<div className={styles.hourglassCapBottom} />
			<div className={styles.hourglassGlass} />
		</div>
	</div>
)
