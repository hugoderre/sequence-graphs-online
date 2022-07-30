import Graph from "./graph"

export default class FibonacciGraph extends Graph {

	componentDidMount(): void {
		this.setState({
			start: 1,
			next: 1,
			steps: 20,
		})
	}

	getData(start: number) {
		let steps = Array.from(Array(this.state.steps || 0).keys())
		for (let i = 0; i < steps.length; i++) {
			if (i === 0) {
				steps[i] = 0
			} else if (i === 1) {
				steps[i] = 1
			} else {
				steps[i] = steps[i - 1] + steps[i - 2]
			}
		}
		return steps
	}
}