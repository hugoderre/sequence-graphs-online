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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './collatz-graph.module.scss';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
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
}

export function CollatzGraph() {

	let [offset, setOffset] = useState(1)
	let [next, setnext] = useState(1)
	let [steps, setSteps] = useState(50)

	const handlenextOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: number = parseInt(event.target.value)
		if(value > 40) {
			alert('Too many next, please set it below 40')
			return
		}
		setnext(value)
	}

	const labels = Array.from(Array(steps).keys());

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
			const label = `Dataset ${i + offset}`;
			const data = generateCollatzLineData(i + offset);
			const radius = 0;
			const tension = 0.4;
			const backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
			const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
			datasets.push({ label, data, radius, tension, backgroundColor, borderColor });
		}

		return datasets;
	}

	const datasets = generateCollatzDatasets(offset, next);
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
				display: true,
				text: 'Collatz Line Chart',
			},
		},
		interaction: {
			intersect: false
		},
		scales: {
			y: {
				stacked: true
			}
		},
		animation,
	};

	const data = {
		type: 'line',
		labels,
		datasets,
	};
	
	return (
		<div className={styles.container}>
			<div className={styles.input_wrapper}>
				<label htmlFor="offset_value">Offset : </label>
				<input type="number" name="offset_value" id="offset_value" value={offset} min="1" onChange={(e) => setOffset(parseInt(e.target.value))} />
			</div>
			<div className={styles.input_wrapper}>
				<label htmlFor="next_value">Next : </label>
				<input type="number"  name="next_value" id="next_value" value={next} min="1" max="40" onChange={handlenextOnChange} />
			</div>
			<Line options={options} data={data} />
		</div>
	)
}
