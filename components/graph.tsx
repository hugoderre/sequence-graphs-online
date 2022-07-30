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
import { GraphDataset } from './graph.d'

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

type GraphProps = {
};

type GraphState = {
	sequence: string,
	start: number,
	next: number,
	steps: number,
	type: string,
};

abstract class Graph extends React.Component<GraphProps, GraphState> {
	state: GraphState = {
		sequence: 'collatz',
		start: 15,
		next: 1,
		steps: 50,
		type: 'line',
	}

	handleNextOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value: number = parseInt(event.target.value)
		if (value > 40) {
			alert('Too many next, please set it below 40')
			return
		}
		this.setState({
			next: value
		})
	}

	handleStepsOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value: number = parseInt(event.target.value)
		if (value > 2000) {
			alert('Too many steps, please set it below 2000')
			return
		}
		this.setState({
			steps: value
		})
	}

	generateDatasets() {
		const datasets: GraphDataset[] = []

		for (let i = 0; i < this.state.next; i++) {
			const label = `N${i + this.state.start}`
			const radius = 0
			const tension = 0
			const backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
			const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
			const fill = true
			const data = this.getData(this.state.start + i)

			datasets.push({ label, radius, tension, backgroundColor, borderColor, fill, data })
		}

		return datasets
	}

	getAnimationSettings(datasets: GraphDataset[]) {
		const totalDuration = this.state.next * 100
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
		return animation
	}

	abstract getData(start: number): number[]
	abstract getDescription(): React.ReactNode

	render() {
		
		const datasets = this.generateDatasets()

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
			// animation: this.getAnimationSettings(datasets),
		}
	
		const data = {
			labels: Array.from(Array(this.state.steps || 0).keys()),
			datasets
		}

		return (
			<div className={styles.container} >
				<div className={styles.description}>
					{this.getDescription()}
				</div>
				<div className="input-wrapper">
					<label htmlFor="graph-type-value">Type : </label>
					<select id="chart-type-value" onChange={e => this.setState({ type: e.target.value })}>
						<option value="line">Line</option>
						<option value="bar">Bar</option>
						<option value="radar">Radar</option>
					</select>
				</div>
				{this.state.sequence === 'collatz' && <div><div className="input-wrapper">
					<label htmlFor="start-value">Start : </label>
					<input type="number" id="start-value" value={this.state.start || ''} min="1" onChange={e => this.setState({ start: parseInt(e.target.value) })} />
				</div>
					<div className="input-wrapper">
						<label htmlFor="next-value">Next : </label>
						<input type="number" id="next-value" value={this.state.next || ''} min="1" max="40" onChange={this.handleNextOnChange.bind(this)} />
					</div></div>}
				<div className="input-wrapper">
					<label htmlFor="steps-value">Steps : </label>
					<input type="number" id="steps-value" value={this.state.steps || ''} min="1" onChange={this.handleStepsOnChange.bind(this)} />
				</div>
				{this.state.type === 'line' && <Line key="line" options={options} data={data} />}
				{this.state.type === 'bar' && <Bar key="bar" options={options} data={data} />}
				{this.state.type === 'radar' && <Radar key="radar" data={data} />}
			</div >
		)
	}
}

export default Graph