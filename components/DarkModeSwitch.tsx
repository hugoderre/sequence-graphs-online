import { useEffect, useState } from "react"
import styles from "./DarkModeSwitch.module.scss"

const DarkModeSwitch: () => JSX.Element = () => {
	const [isDarkMode, setIsDarkMode] = useState(true)

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
	}

	useEffect(() => {
		const body = document.body
		if (isDarkMode) {
			body.dataset.colorScheme = "dark"
		} else {
			body.dataset.colorScheme = "light"
		}
	})

	return (
		<div className={styles.container}>
			<div className={styles.toggle_wrapper}>
				<input 
					type="checkbox" 
					id="dark-mode-switch" 
					aria-label="dark mode toggle" 
					className={styles.toggle_checkbox}
					checked={isDarkMode}
					onChange={toggleDarkMode}
				/>
				<div className={styles.toggle_circle}></div>
				<i className={`${styles.icon} ${styles.icon_moon} fa-solid fa-moon`}></i>
				<i className={`${styles.icon} ${styles.icon_sun} fa-solid fa-sun`}></i>
			</div>
		</div>
	);
}
export default DarkModeSwitch