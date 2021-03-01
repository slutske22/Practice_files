export const multivariate = {
	type: 'class-breaks',
	field: 'Deaths',
	visualVariables: [
		{
			type: 'size',
			field: 'Confirmed',
			valueExpression: null,
			valueUnit: 'unknown',
			minSize: 6,
			maxSize: 37.5,
			minDataValue: 0,
			maxDataValue: 1257986,
		},
		{
			type: 'color',
			field: 'Deaths',
			valueExpression: null,
			stops: [
				{
					value: 0,
					color: [255, 252, 212, 0],
					label: '< 0',
				},
				{
					value: 626.5,
					color: [238, 190, 139, 255],
					label: null,
				},
				{
					value: 1253,
					color: [221, 128, 66, 255],
					label: '1,253',
				},
				{
					value: 1879.5,
					color: [162, 64, 33, 255],
					label: null,
				},
				{
					value: 2506,
					color: [102, 0, 0, 255],
					label: '> 2,506',
				},
			],
		},
	],
	authoringInfo: {
		visualVariables: [
			{
				type: 'size',
				minSliderValue: 0,
				maxSliderValue: 5094400,
			},
			{
				type: 'color',
				minSliderValue: 0,
				maxSliderValue: 163463,
				theme: 'high-to-low',
			},
		],
	},
	// minValue: -9007199254740991,
	classBreakInfos: [
		{
			symbol: {
				color: [170, 170, 170, 255],
				size: 6,
				angle: 0,
				xoffset: 0,
				yoffset: 0,
				type: 'simple-marker',
				// style: 'esriSMSCircle',
				outline: {
					color: [255, 255, 255, 64],
					width: 0.75,
					type: 'simple-line',
					// style: 'esriSLSSolid',
				},
			},
			classMaxValue: 9007199254740991,
		},
	],
};

export const heatmap = {
	type: 'heatmap',
	blurRadius: 10,
	colorStops: [
		{
			ratio: 0,
			color: [212, 227, 245, 0],
		},
		{
			ratio: 0.01,
			color: [212, 227, 245, 0],
		},
		{
			ratio: 0.01,
			color: [212, 227, 245, 255],
		},
		{
			ratio: 0.01,
			color: [212, 227, 245, 255],
		},
		{
			ratio: 0.0925,
			color: [179, 197, 247, 255],
		},
		{
			ratio: 0.17500000000000002,
			color: [147, 166, 250, 255],
		},
		{
			ratio: 0.2575,
			color: [114, 136, 252, 255],
		},
		{
			ratio: 0.34,
			color: [86, 111, 253, 255],
		},
		{
			ratio: 0.42250000000000004,
			color: [57, 85, 254, 255],
		},
		{
			ratio: 0.505,
			color: [29, 59, 254, 255],
		},
		{
			ratio: 0.5875,
			color: [0, 34, 255, 255],
		},
		{
			ratio: 0.67,
			color: [51, 78, 204, 255],
		},
		{
			ratio: 0.7525000000000001,
			color: [102, 122, 153, 255],
		},
		{
			ratio: 0.8350000000000001,
			color: [153, 167, 102, 255],
		},
		{
			ratio: 0.9175000000000001,
			color: [204, 211, 51, 255],
		},
		{
			ratio: 1,
			color: [255, 255, 0, 255],
		},
	],
	maxPixelIntensity: 9566880,
	minPixelIntensity: 0,
	field: 'Confirmed',
};

export const heatmapAsFunction = (max) => ({
	type: 'heatmap',
	blurRadius: 10,
	colorStops: [
		{
			ratio: 0,
			color: [212, 227, 245, 0],
		},
		{
			ratio: 0.01,
			color: [212, 227, 245, 0],
		},
		{
			ratio: 0.01,
			color: [212, 227, 245, 255],
		},
		{
			ratio: 0.01,
			color: [212, 227, 245, 255],
		},
		{
			ratio: 0.0925,
			color: [179, 197, 247, 255],
		},
		{
			ratio: 0.17500000000000002,
			color: [147, 166, 250, 255],
		},
		{
			ratio: 0.2575,
			color: [114, 136, 252, 255],
		},
		{
			ratio: 0.34,
			color: [86, 111, 253, 255],
		},
		{
			ratio: 0.42250000000000004,
			color: [57, 85, 254, 255],
		},
		{
			ratio: 0.505,
			color: [29, 59, 254, 255],
		},
		{
			ratio: 0.5875,
			color: [0, 34, 255, 255],
		},
		{
			ratio: 0.67,
			color: [51, 78, 204, 255],
		},
		{
			ratio: 0.7525000000000001,
			color: [102, 122, 153, 255],
		},
		{
			ratio: 0.8350000000000001,
			color: [153, 167, 102, 255],
		},
		{
			ratio: 0.9175000000000001,
			color: [204, 211, 51, 255],
		},
		{
			ratio: 1,
			color: [255, 255, 0, 255],
		},
	],
	maxPixelIntensity: max,
	minPixelIntensity: 0,
	field: 'Confirmed',
});
