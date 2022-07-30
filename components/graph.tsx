import React, { useEffect, useState } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	BarElement,
	RadialLinearScale,
	ArcElement,
	Filler,
} from 'chart.js'
import { Bar, Line, Radar } from 'react-chartjs-2'
import styles from './graph.module.scss'
import generateCollatzLineData from './collatz'
import { GraphDataset } from './graph.d'
import generateFibonacciLineData from './fibonacci'

ChartJS.register(
	ArcElement,
	BarElement,
	PointElement,
	LineElement,
	RadialLinearScale,
	CategoryScale,
	LinearScale,
	Filler,
	Title,
	Tooltip,
	Legend
)

export function Graph() {

	let [sequence, setSequence] = useState('collatz')
	let [start, setStart] = useState(15)
	let [next, setNext] = useState(1)
	let [steps, setSteps] = useState(50)
	let [type, setType] = useState('line')

	useEffect(() => {
		switch (sequence) {
			case 'fibonacci':
				setSteps(20)
				break
			case 'collatz':
			default:
				setSteps(50)
				break
		}
	}, [sequence])

	const handleNextOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(e.target.value)
		if (value > 40) {
			alert('Too many next, please set it below 40')
			return
		}
		setNext(value)
	}

	const labels = Array.from(Array(steps || 0).keys())

	const generateDatasets: (start: number, next?: number) => GraphDataset[] = (start, next = 1) => {
		const datasets: GraphDataset[] = []

		for (let i = 0; i < next; i++) {
			const label = `N${i + start}`
			const radius = 0
			const tension = 0
			const backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
			const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
			const fill = false

			let data
			switch (sequence) {
				case 'fibonacci':
					data = generateFibonacciLineData(labels)
					break
				case 'collatz':
				default:
					data = generateCollatzLineData(i + start, labels)
					break
			}

			datasets.push({ label, radius, tension, backgroundColor, borderColor, fill, data })
		}

		return datasets
	}

	const datasets = generateDatasets(start, next)
	const totalDuration = next * 100
	const delayBetweenPoints = totalDuration / datasets.length
	const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y
	const animation = {
		x: {
			type: 'number',
			easing: 'easeInElastic',
			duration: delayBetweenPoints,
			from: NaN, // the point is initially skipped
			delay(ctx: any) {
				if (ctx.type !== 'data' || ctx.xStarted) {
					return 0
				}
				ctx.xStarted = true
				return ctx.index * delayBetweenPoints
			}
		},
		y: {
			type: 'number',
			easing: 'easeInElastic',
			duration: delayBetweenPoints,
			from: previousY,
			delay(ctx: any) {
				if (ctx.type !== 'data' || ctx.yStarted) {
					return 0
				}
				ctx.yStarted = true
				return ctx.index * delayBetweenPoints
			}
		},
		onProgress: function (animation: any) { }
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
				text: 'Collatz Line Chart',
			},
		},
		interaction: {
			intersect: false
		},
		// animation,
	}

	const data = {
		labels,
		datasets,
	}

	return (
		<div className={styles.container}>
			<div className={styles.input_wrapper}>
				<label htmlFor="sequence-type-value">Sequence : </label>
				<select id="sequence-type-value" onChange={e => setSequence(e.target.value)}>
					<option value="collatz">Collatz</option>
					<option value="fibonacci">Fibonacci</option>
				</select>
			</div>
			<div className={styles.input_wrapper}>
				<label htmlFor="graph-type-value">Type : </label>
				<select id="chart-type-value" onChange={e => setType(e.target.value)}>
					<option value="line">Line</option>
					<option value="bar">Bar</option>
					<option value="radar">Radar</option>
				</select>
			</div>
			{sequence === 'collatz' && <div><div className={styles.input_wrapper}>
				<label htmlFor="start-value">Start : </label>
				<input type="number" id="start-value" value={start || ''} min="1" onChange={e => setStart(parseInt(e.target.value))} />
			</div>
			<div className={styles.input_wrapper}>
				<label htmlFor="next-value">Next : </label>
				<input type="number" id="next-value" value={next || ''} min="1" max="40" onChange={handleNextOnChange} />
			</div></div>}
			<div className={styles.input_wrapper}>
				<label htmlFor="steps-value">Steps : </label>
				<input type="number" id="steps-value" value={steps || ''} min="1" onChange={e => setSteps(parseInt(e.target.value))} />
			</div>
			{type === 'line' && <Line key="line" options={options} data={data} />}
			{type === 'bar' && <Bar key="bar" options={options} data={data} />}
			{type === 'radar' && <Radar key="radar" data={data} />}
		</div>
	)
}