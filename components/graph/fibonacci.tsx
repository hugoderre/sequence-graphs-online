import Graph from "./graph"

export default class FibonacciGraph extends Graph {

	componentDidMount(): void {
		this.setState({
			sequence: 'fibonacci',
			start: 1,
			next: 1,
			steps: 10
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

	getDescription() {
		return (
			<p>
				<strong>Fibonacci sequence</strong> is a sequence of natural numbers defined in the following way:<br/>
				F(0) = 0<br/>
				F(1) = 1<br/>
				F(n) = F(n-1) + F(n-2)<br/>
			</p>
		)
	}
}