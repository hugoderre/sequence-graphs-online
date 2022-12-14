import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React from 'react'
import DarkModeSwitch from '../components/DarkModeSwitch'
import { GraphTypeInputs, GraphRegister } from '../components/Graph/GraphRegister'
import SocialMedia from '../components/SocialMedia/SocialMedia'

const Home: NextPage = () => {
	let [sequence, setSequence] = React.useState('collatz')

	return (
		<div className={styles.container}>
			<Head>
				<title>Sequence Graphs Online</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<main className={styles.main}>
				<header>
					<h1>Sequence Graphs Online</h1>
					<DarkModeSwitch />
				</header>
				<GraphTypeInputs setSequence={setSequence} />
				<GraphRegister sequence={sequence} />
				<div className="contribute">
					<h2>Contribute</h2>
					<p>
						Sequence Graphs Online is an open source project. Any contribution will be treated and highly appreciated.<br/>
						Feel free to add another famous sequences, enhance the existing ones or makes the interface better.<br/> 
						This project uses Next.js framework, and the design of the code makes it easy to extend it to add new sequences.<br/> 
						You can find the source code on <a href="https://github.com/hugoderre/sequence-graphs-online" target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>.
					</p>
				</div>
				<SocialMedia />
			</main>
		</div>
	)
}

export default Home