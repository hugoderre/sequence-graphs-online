import Graph from "./graph"

export default class CollatzGraph extends Graph {

	componentDidMount(): void {
		this.setState({
			start: 15,
			next: 1,
			steps: 50,
		})
	}

	getData(start: number) {
		let current = start
		return Array.from(Array(this.state.steps || 0).keys()).map((n, k) => {
			if (k) {
				if (current % 2 === 0) {
					current /= 2
				} else {
					current = current * 3 + 1
				}
			}
			return current
		})
	}
	
	getDescription() {
		return (
			<p>
				<strong>Collatz sequence</strong> is a sequence of natural integers defined in the following way: we start from a strictly positive integer; if it is even, we divide it by 2; if it is odd, we multiply it by 3 and we add 1. <br/>
				By repeating the operation, we obtain a sequence of strictly positive integers of which each one depends only on its predecessor. <br/>
				After the number 1 has been reached, the sequence of values (1,4,2,1,4,2...) repeats itself indefinitely in a cycle of length 3, called trivial cycle.
			</p>
		)
	}
}