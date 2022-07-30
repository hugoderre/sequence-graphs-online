import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React from 'react'
import CollatzGraph from '../components/graph/collatz'
import FibonacciGraph from '../components/graph/fibonacci'
import CollatzCompressedGraph from '../components/graph/collatz-compressed'
import SocialMedia from '../components/social-media/social-media'

const Home: NextPage = () => {
	let [sequence, setSequence] = React.useState('collatz')

	return (
		<div className={styles.container}>
			<Head>
				<title>Sequences Graphs</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<main className={styles.main}>
				<h1>Sequence Graphs</h1>
				<div className="input-wrapper">
					<label htmlFor="sequence-type-value">Sequence : </label>
					<select id="sequence-type-value" onChange={e => setSequence(e.target.value)}>
						<option value="collatz">Collatz</option>
						<option value="collatz-compressed">Collatz (Compressed)</option>
						<option value="fibonacci">Fibonacci</option>
					</select>
				</div>
				{sequence === 'collatz' && <CollatzGraph />}
				{sequence === 'collatz-compressed' && <CollatzCompressedGraph />}
				{sequence === 'fibonacci' && <FibonacciGraph />}
				<SocialMedia />
			</main>
		</div>
	)
}

export default Home