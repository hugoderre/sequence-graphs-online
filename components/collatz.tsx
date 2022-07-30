import { LineData } from "./graph.d"

const generateCollatzLineData: (n: number, steps: number[]) => LineData = (n, steps) => {
	let current = n
	return steps.map((n, k) => {
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

export default generateCollatzLineData