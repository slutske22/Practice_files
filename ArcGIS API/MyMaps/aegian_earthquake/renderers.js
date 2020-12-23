export const shakeIntensityRenderer = {
	type: 'class-breaks',
	field: 'grid_value',
	classBreakInfos: [
		{
			symbol: {
				color: [0, 0, 0, 0],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 1.9999,
			label: 'I (Not Felt)',
			description: '',
		},
		{
			symbol: {
				color: [0, 0, 0, 0],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 3.9999,
			label: 'II - III (Weak)',
			description: '',
		},
		{
			symbol: {
				color: [140, 250, 230, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 4.9999,
			label: 'IV (Light)',
			description: '',
		},
		{
			symbol: {
				color: [140, 250, 140, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 5.9999,
			label: 'V (Moderate)',
			description: '',
		},
		{
			symbol: {
				color: [255, 220, 20, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 6.9999,
			label: 'VI (Strong)',
			description: '',
		},
		{
			symbol: {
				color: [255, 180, 0, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 7.9999,
			label: 'VII (Very Strong)',
			description: '',
		},
		{
			symbol: {
				color: [255, 120, 20, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 8.9999,
			label: 'VIII (Severe) ',
			description: '',
		},
		{
			symbol: {
				color: [255, 0, 0, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 9.9999,
			label: 'IX (Violent)',
			description: '',
		},
		{
			symbol: {
				color: [143, 0, 0, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					// style: 'none',
				},
				type: 'simple-fill',
				// style: 'none',
			},
			classMaxValue: 12,
			label: 'X+ (Extreme)',
			description: '',
		},
	],
	classificationMethod: 'manual',
};

export const secondAttempt = {
	type: 'class-breaks',
	field: 'grid_value',
	classBreakInfos: [
		{
			symbol: {
				color: [0, 0, 0, 0],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'I (Not Felt)',
			classMaxValue: 1.9999,
		},
		{
			symbol: {
				color: [0, 0, 0, 0],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'II - III (Weak)',
			classMaxValue: 3.9999,
		},
		{
			symbol: {
				color: [247, 191, 197, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'IV (Light)',
			classMaxValue: 4.9999,
		},
		{
			symbol: {
				color: [245, 160, 166, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'V (Moderate)',
			classMaxValue: 5.9999,
		},
		{
			symbol: {
				color: [240, 97, 103, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'VI (Strong)',
			classMaxValue: 6.9999,
		},
		{
			symbol: {
				color: [240, 97, 103, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'VII (Very Strong)',
			classMaxValue: 7.9999,
		},
		{
			symbol: {
				color: [237, 65, 71, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'VIII (Severe) ',
			classMaxValue: 8.9999,
		},
		{
			symbol: {
				color: [235, 33, 40, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'IX (Violent)',
			classMaxValue: 9.9999,
		},
		{
			symbol: {
				color: [232, 2, 8, 255],
				outline: {
					color: [0, 0, 0, 0],
					width: 0.4,
					type: 'simple-line',
					style: 'none',
				},
				type: 'simple-fill',
				style: 'none',
			},
			label: 'X+ (Extreme)',
			classMaxValue: 12,
		},
	],
	classificationMethod: 'esriClassifyManual',
};
