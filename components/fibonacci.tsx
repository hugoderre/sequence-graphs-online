import { LineData } from "./graph.d"

const generateFibonacciLineData: (steps: number[]) => LineData = (steps) => {
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

export default generateFibonacciLineData