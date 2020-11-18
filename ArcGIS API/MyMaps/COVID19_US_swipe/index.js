import popupTemplate from './popupTemplate.js';
import * as renderers from './renderers.js';

// Color Ramps:
// https://developers.arcgis.com/javascript/latest/guide/esri-color-ramps/index.html

require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/FeatureLayer',
	'esri/widgets/Legend',
	'esri/popup/content/MediaContent',
	'esri/popup/content/support/ChartMediaInfoValue',
	'esri/popup/content/LineChartMediaInfo',
], function (
	Map,
	MapView,
	FeatureLayer,
	Legend,
	MediaContent,
	ChartMediaInfoValue,
	LineChartMediaInfo
) {
	var unemploymentLayer = new FeatureLayer({
		url:
			'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/BLS_Monthly_Unemployment_Current_14_Months/FeatureServer/2',
		outFields: ['*'],
		popupTemplate: {
			declaredClass: 'unemployment-popup',
			content: [
				{
					type: 'text',
					text: `
						<div>
							<h2>{NAME}</h2>
							<h3>BLS Unemployment Statistics, past 14 months<h3>
						</div>
					`,
				},
				{
					type: 'media',
					mediaInfos: [
						{
							type: 'line-chart',
							caption: '% of popuplation unemployed, last 14 months',
							value: {
								fields: [
									'PctUnemployed_CurrentMonth',
									'PctUnemployed_01Month',
									'PctUnemployed_02Month',
									'PctUnemployed_03Month',
									'PctUnemployed_04Month',
									'PctUnemployed_05Month',
									'PctUnemployed_06Month',
									'PctUnemployed_07Month',
									'PctUnemployed_08Month',
									'PctUnemployed_09Month',
									'PctUnemployed_10Month',
									'PctUnemployed_11Month',
									'PctUnemployed_12Month',
									'PctUnemployed_13Month',
								],
								normalizeField: null,
								// tooltipField: '<field name>',
							},
						},
					],
				},
			],
		},
	});

	var map = new Map({
		basemap: 'gray-vector',
		layers: [unemploymentLayer],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [-100, 38],
		zoom: 4,
		map: map,
	});

	var legend = new Legend({
		view: view,
		layerInfos: [
			{
				layer: unemploymentLayer,
			},
		],
	});

	view.ui.add(legend, 'top-right');
});
