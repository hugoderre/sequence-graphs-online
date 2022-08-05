import styles from "./SocialMedia.module.scss";

export default function SocialMedia() {
	return (
		<div className={styles.container}>
			<a href="https://github.com/hugoderre/sequence-graphs-online" target="_blank" rel="noopener noreferrer" title="Github" className={styles.github_link}><i className="fa-brands fa-github"></i></a>
			<a href="https://www.hugoderre.fr" target="_blank" rel="noopener noreferrer" title="My Website" className={styles.website_link}><i className="fa-solid fa-globe"></i></a>
		</div>
	)
}