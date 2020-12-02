const slides = [
	{
		id: '17621db6e2e-slide-0',
		title: {
			text: '',
		},
		thumbnail: {
			url:
				'data:image/jpeg;base64,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',
		},
		viewpoint: {
			rotation: 143,
			scale: 15321453.727396129,
			targetGeometry: {
				spatialReference: {
					latestWkid: 3857,
					wkid: 102100,
				},
				x: -3249325.373082674,
				y: 256506.99926305987,
				z: -25893.373442312703,
			},
			camera: {
				position: {
					spatialReference: {
						latestWkid: 3857,
						wkid: 102100,
					},
					x: -1892431.3434856508,
					y: 2154935.915085894,
					z: 3000000,
				},
				heading: 217,
				tilt: 33.000000000000036,
			},
		},
		ground: {
			transparency: 0,
		},
		visibleLayers: [
			{
				id: '17621db46d4-layer-0',
			},
			{
				id: '17621db46d4-layer-1',
			},
			{
				id: '17621db46d4-layer-2',
			},
			{
				id: '17621db46d4-layer-3',
			},
			{
				id: '9790623814cac7dc',
			},
		],
		environment: {
			lighting: {
				datetime: 1584277680000,
			},
			atmosphereEnabled: true,
			starsEnabled: true,
		},
	},
];
