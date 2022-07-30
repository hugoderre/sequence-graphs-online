import { LineData } from "./graph.d"

const generateFibonacciLineData: (labels: number[]) => LineData = (labels) => {
	for (let i = 0; i < labels.length; i++) {
		if (i === 0) {
			labels[i] = 0
		} else if (i === 1) {
			labels[i] = 1
		} else {
			labels[i] = labels[i - 1] + labels[i - 2]
		}
	}
	return labels
}

export default generateFibonacciLineData