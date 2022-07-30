import { LineData } from "./graph.d"

const generateCollatzLineData: (n: number, labels: number[]) => LineData = (n, labels) => {
	let current = n
	return labels.map((n, k) => {
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