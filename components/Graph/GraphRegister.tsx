import CollatzGraph from "./Collatz";
import CollatzCompressedGraph from "./CollatzCompressed";
import FibonacciGraph from "./Fibonacci";
import Graph from "./Graph";

const graphs: typeof Graph[] = [
	CollatzGraph,
	CollatzCompressedGraph,
	FibonacciGraph,
]

export const GraphRegister: (props: { sequence: string }) => JSX.Element = (props) => {
	const GraphComponent = graphs.find((graph) => {
		return graph.graphKey === props.sequence
	})

	if (GraphComponent) {
		return <GraphComponent />
	} else {
		return <div>Graph not found</div>
	}
}

export const GraphTypeInputs: (props: {setSequence: (sequence: string) => void}) => JSX.Element = (props) => {
	return (
		<div className="input-wrapper">
			<label htmlFor="sequence-type-value">Sequence : </label>
			<select id="sequence-type-value" onChange={e => props.setSequence(e.target.value)}>
				{graphs.map((graph) => <option key={graph.graphKey} value={graph.graphKey}>{graph.graphName}</option>)}
			</select>
		</div>
	)
}