import Graph from "./Graph"

export default class CollatzCompressedGraph extends Graph {

	componentDidMount(): void {
		this.setState({
			sequence: 'collatz-compressed',
			start: 15,
			next: 1,
			steps: 50,
		})
	}

	getDescription() {
		return (
			<p>
				(Read the description of <strong>Collatz section</strong> to understand the original sequence)<br/> 
				We notice that if <b>N</b> is odd, N+1 is necessarily even and thus, the following step of the sequence must be a division by two; we can define a new compressed version of the <strong>Collatz sequence</strong> by combining these two steps in the following way:<br/> 
				<b>Odd</b> =&gt; ( 3<b>N</b> + 1 ) / 2 if <b>N</b><br/> 
				<b>Even</b> =&gt; <b>N</b> / 2 if <b>N</b> is even<br/>
				This way, the sequence is compressed, and the number of steps is reduced to half the original number of steps.
			</p>
		)
	}

	getData(start: number) {
		let current = start
		return Array.from(Array(this.state.steps || 0).keys()).map((n, k) => {
			if (k) {
				if (current % 2 === 0) {
					current /= 2
				} else {
					current = ( current * 3 + 1 ) / 2
				}
			}
			return current
		})
	}
}