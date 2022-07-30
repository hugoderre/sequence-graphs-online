import React, { useState } from 'react';
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
} from 'chart.js';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import styles from './collatz-graph.module.scss';

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
);

export type CollatzLineData = number[]

export interface CollatzDataset {
	label: string;
	data: CollatzLineData;
	radius: number;
	tension: number;
	backgroundColor: string;
	borderColor: string;
	fill: boolean;
}

export function CollatzGraph() {

	let [offset, setOffset] = useState(5)
	let [next, setnext] = useState(2)
	let [steps, setSteps] = useState(50)
	let [type, setType] = useState('line')

	const handlenextOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(event.target.value)
		if (value > 40) {
			alert('Too many next, please set it below 40')
			return
		}
		setnext(value)
	}

	const labels = Array.from(Array(steps || 0).keys());

	const generateCollatzLineData: (n: number) => CollatzLineData = n => {
		let collatzCurrentNumber = n
		return labels.map((n, k) => {
			if (k) {
				if (collatzCurrentNumber % 2 === 0) {
					collatzCurrentNumber /= 2
				} else {
					collatzCurrentNumber = collatzCurrentNumber * 3 + 1
				}
			}
			return collatzCurrentNumber
		})
	}

	const generateCollatzDatasets: (offset: number, next?: number) => CollatzDataset[] = (offset, next = 1) => {
		const datasets: CollatzDataset[] = [];

		for (let i = 0; i < next; i++) {
			const label = `N${i + offset}`;
			const data = generateCollatzLineData(i + offset);
			const radius = 0;
			const tension = 0;
			const backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
			const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
			const fill = false;
			datasets.push({ label, data, radius, tension, backgroundColor, borderColor, fill });
		}

		return datasets;
	}

	const datasets = generateCollatzDatasets(offset, next);
	console.log(datasets)
	const totalDuration = next * 100;
	const delayBetweenPoints = totalDuration / datasets.length;
	const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
	const animation = {
		x: {
			type: 'number',
			easing: 'easeInElastic',
			duration: delayBetweenPoints,
			from: NaN, // the point is initially skipped
			delay(ctx: any) {
				if (ctx.type !== 'data' || ctx.xStarted) {
					return 0;
				}
				ctx.xStarted = true;
				return ctx.index * delayBetweenPoints;
			}
		},
		y: {
			type: 'number',
			easing: 'easeInElastic',
			duration: delayBetweenPoints,
			from: previousY,
			delay(ctx: any) {
				if (ctx.type !== 'data' || ctx.yStarted) {
					return 0;
				}
				ctx.yStarted = true;
				return ctx.index * delayBetweenPoints;
			}
		},
		onProgress: function (animation: any) { }
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
				text: 'Collatz Line Graph',
			},
		},
		interaction: {
			intersect: false
		},
		animation,
	};

	const data = {
		labels,
		datasets,
	};

	return (
		<div className={styles.container}>
			<div className={styles.input_wrapper}>
				<label htmlFor="offset-value">Offset : </label>
				<input type="number" id="offset-value" value={offset || ''} min="1" onChange={(e) => setOffset(parseInt(e.target.value))} />
			</div>
			<div className={styles.input_wrapper}>
				<label htmlFor="next-value">Next : </label>
				<input type="number" id="next-value" value={next || ''} min="1" max="40" onChange={handlenextOnChange} />
			</div>
			<div className={styles.input_wrapper}>
				<label htmlFor="steps-value">Steps : </label>
				<input type="number" id="steps-value" value={steps || ''} min="1" onChange={(e) => setSteps(parseInt(e.target.value))} />
			</div>
			<div className={styles.input_wrapper}>
				<label htmlFor="chart-type-value">Graph : </label>
				<select id="chart-type-value" onChange={(e) => setType(e.target.value)}>
					<option value="line">Line</option>
					<option value="bar">Bar</option>
					<option value="radar">Radar</option>
				</select>
			</div>
			{type === 'line' && <Line key="line" options={options} data={data} />}
			{type === 'bar' && <Bar key="bar" options={options} data={data} />}
			{type === 'radar' && <Radar key="radar" data={data} />}
		</div>
	)
}