import React from 'react';
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

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export type SyracuseLineData = number[]

export interface SyracuseDataset {
	label: string;
	data: SyracuseLineData;
	radius: number;
	tension: number;
	backgroundColor: string;
	borderColor: string;
}

const labels = Array.from(Array(100).keys());

const generateSyracuseLineData: (n: number) => SyracuseLineData = n => {
	let syracuseCurrentNumber = n
	return labels.map((n, k) => {
		if (k) {
			if (syracuseCurrentNumber % 2 === 0) {
				syracuseCurrentNumber /= 2
			} else {
				syracuseCurrentNumber = syracuseCurrentNumber * 3 + 1
			}
		}
		return syracuseCurrentNumber
	})
}

const generateSyracuseDatasets: (offset: number, times?: number) => SyracuseDataset[] = (offset, times = 1) => {
	const datasets: SyracuseDataset[] = [];

	for (let i = 1; i <= times; i++) {
		const label = `Dataset ${i + offset}`;
		const data = generateSyracuseLineData(i + offset);
		const radius = 0;
		const tension = 0.4;
		const backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
		const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
		datasets.push({ label, data, radius, tension, backgroundColor, borderColor });
	}

	return datasets;
}

const offset = 1;
const times = 1;
const datasets = generateSyracuseDatasets(offset, times);
const totalDuration = times * 100;
const delayBetweenPoints = totalDuration / datasets.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
	x: {
		type: 'number',
		easing: 'linear',
		duration: delayBetweenPoints,
		from: NaN, // the point is initially skipped
		delay(ctx) {
			if (ctx.type !== 'data' || ctx.xStarted) {
				return 0;
			}
			ctx.xStarted = true;
			return ctx.index * delayBetweenPoints;
		}
	},
	y: {
		type: 'number',
		easing: 'linear',
		duration: delayBetweenPoints,
		from: previousY,
		delay(ctx) {
			if (ctx.type !== 'data' || ctx.yStarted) {
				return 0;
			}
			ctx.yStarted = true;
			return ctx.index * delayBetweenPoints;
		}
	},
	onProgress: function (animation: any) {
		console.log(animation)
		// progress.value = animation.currentStep / animation.numSteps;
	}
};

export const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: 'Syracuse Line Chart',
		},
	},
	interaction: {
		intersect: false
	},
	scales: {
		x: {
			type: 'linear'
		}
	},
	animation,
};

export const data = {
	type: 'line',
	labels,
	datasets,
	//? Interessants :
	// 1818 : 127600, 
	// 1914 : 127600,
	// 80099 : Stablisation basse puis remonte un peu
};

export function SyracuseChart() {
	return <Line options={options} data={data} />;
}
