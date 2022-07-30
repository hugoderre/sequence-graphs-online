export type LineData = number[]

export interface GraphDataset {
	label: string;
	radius: number;
	tension: number;
	backgroundColor: string;
	borderColor: string;
	fill: boolean;
	data: LineData;
}