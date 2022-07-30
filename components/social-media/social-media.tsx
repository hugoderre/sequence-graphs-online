import styles from "./social-media.module.scss";

export default function SocialMedia() {
	return (
		<div className={styles.container}>
			<a href="https://github.com/hugoderre" target="_blank" rel="noopener noreferrer" className={styles.github_link}><i className="fa-brands fa-github"></i></a>
			<a href="https://www.hugoderre.fr" target="_blank" rel="noopener noreferrer" className={styles.website_link}><i className="fa-solid fa-globe"></i></a>
		</div>
	)
}