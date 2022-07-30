import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React from 'react'
import CollatzGraph from '../components/collatz'
import FibonacciGraph from '../components/fibonacci'
import CollatzCompressedGraph from '../components/collatz-compressed'

const Home: NextPage = () => {
	let [sequence, setSequence] = React.useState('collatz')

	return (
		<div className={styles.container}>
			<Head>
				<title>Sequences Graphs</title>
    			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<meta name="description" content="This web app allow you to configure and visualize sequence graphs like collatz, fibonacci and more."/>
				<link rel="icon" href="/favicon.ico"/>

				{/* Facebook */}
				{/* <meta property="og:image" content="https://hugoderre.github.io/sudoku/meta-img.png"/> */}
				<meta property="og:title" content="Sequence Graphs Online"/>
				<meta property="og:description" content="This web app allow you to configure and visualize sequence graphs like collatz, fibonacci and more."/>
				{/* <meta property="og:url" content="https://hugoderre.github.io/sudoku"/> */}
				<meta property="og:type" content="website"/>

				{/* Twitter */}
				{/* <meta name="twitter:image" content="https://hugoderre.github.io/sudoku/meta-img.png"/> */}
				<meta name="twitter:card" content="summary"/>
				<meta name="twitter:title" content="Sequence Graphs Online"/>
				<meta name="twitter:description" content="This web app allow you to configure and visualize sequence graphs like collatz, fibonacci and more."/>
				<meta name="twitter:creator" content="@devgohu"/>

				{/* Google */}
			</Head>
			<main className={styles.main}>
				<h1>Sequence Graphs Online</h1>
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
			</main>
		</div>
	)
}

export default Home