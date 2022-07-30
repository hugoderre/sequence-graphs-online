import Graph from "./graph"

export default class CollatzGraph extends Graph {

	componentDidMount(): void {
		this.setState({
			start: 5,
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
}