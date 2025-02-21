import React from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart as LineC,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{
		name: "16",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "17",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "18",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "19",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "20",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "21",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "22",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

export default function LineChart() {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineC
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="pv"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
				<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
			</LineC>
		</ResponsiveContainer>
	);
}
