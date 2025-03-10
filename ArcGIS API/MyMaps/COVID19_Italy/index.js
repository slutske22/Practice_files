import * as popupTemplates from "./popupTemplates.js";

require([
	"esri/Map",
	"esri/views/MapView",
	"esri/geometry/Extent",
	"esri/layers/FeatureLayer",
	"esri/layers/TileLayer",
	"esri/layers/GroupLayer",
	"esri/smartMapping/renderers/dotDensity",
	"esri/renderers/DotDensityRenderer",
	"esri/widgets/LayerList",
	"esri/widgets/Legend",
], function (
	Map,
	MapView,
	Extent,
	FeatureLayer,
	TileLayer,
	GroupLayer,
	dotDensityRendererCreator,
	DotDensityRenderer,
	LayerList,
	Legend
) {
	// ----------------------------------------------------- //
	// --------------- BASIC MAP SETUP --------------------- //
	// ----------------------------------------------------- //
	const GrayBase = new TileLayer({
		url:
			"https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer",
		listMode: "hide",
	});

	var map = new Map({
		// basemap: "dark-gray-vector",
		layers: [GrayBase],
	});

	var view = new MapView({
		container: "viewDiv",
		extent: new Extent({
			xmax: 2401060.315701193,
			xmin: 270607.4633373271,
			ymax: 5998729.274054984,
			ymin: 4323229.614044366,
			spatialReference: {
				wkid: 102100,
			},
		}),
		map: map,
	});

	view.on("click", (e) => console.log(view));

	// ----------------------------------------------------- //
	// ---  COVID  MUNICIPALITY LAYER  SETUP --------------- //
	// ----------------------------------------------------- //

	// var municipalLayer = new FeatureLayer({
	// 	url:
	// 		"https://services6.arcgis.com/swIsfiMN39u9wKrT/ArcGIS/rest/services/Italy_COVID19_WFL1/FeatureServer/1",
	// 	outFields: ["*"],
	// 	popupTemplate: popupTemplates.municipalPopup,
	// });

	// map.add(municipalLayer);

	// const params = {
	// 	layer: municipalLayer,
	// 	view,
	// 	attributes: [
	// 		{
	// 			field: "Total_Cases",
	// 			label: "Cases",
	// 		},
	// 	],
	// };

	// dotDensityRendererCreator.createRenderer(params).then((result) => {
	// 	municipalLayer.renderer = result.renderer;
	// });

	// ------------------------------------------------------------------- //
	// ------- PROVINCIAL BORDERS AND LABELS  LAYERS SETUP --------------- //
	// ------------------------------------------------------------------- //

	var bordersAndLabels = new FeatureLayer({
		name: "Borders and Labels",
		url:
			"https://services6.arcgis.com/swIsfiMN39u9wKrT/ArcGIS/rest/services/Italy_COVID19_WFL1/FeatureServer/0",
		outFields: ["*"],
		renderer: {
			type: "simple",
			symbol: {
				type: "simple-fill", // autocasts as new SimpleFillSymbol()
				outline: {
					// autocasts as new SimpleLineSymbol()
					color: [0, 0, 0, 0.3],
					width: "0.25px",
				},
				color: [0, 0, 0, 0],
				label: "Province",
			},
		},
		popupTemplate: popupTemplates.provincialPopup,
		listMode: "hide",
	});

	map.add(bordersAndLabels);

	// ----------------------------------------------------- //
	// ------- COVID PROVINCIAL LAYERS SETUP --------------- //
	// ----------------------------------------------------- //

	var provincialPop = new FeatureLayer({
		name: "Total Population",
		url:
			"https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/COVID19_MAP_of_Italy_WFL1/FeatureServer/3",
		outFields: ["*"],
		renderer: new DotDensityRenderer({
			referenceDotValue: 1000,
			outline: null,
			legendOptions: {
				unit: "people",
			},
			attributes: [
				{
					field: "TotR",
					color: "lightgrey",
					label: "Total Population",
				},
			],
		}),
		visible: false,
	});

	var provincialLayerPercentOfPop = new FeatureLayer({
		name: "Cases as % of Total Population",
		url:
			"https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/COVID19_MAP_of_Italy_WFL1/FeatureServer/3",
		outFields: ["*"],
		renderer: new DotDensityRenderer({
			referenceDotValue: null,
			outline: null,
			legendOptions: {
				unit: "% of popuplation * 100",
			},
			attributes: [
				{
					valueExpression: " $feature.TotC / $feature.TotR * 10000",
					color: "orange",
					label: "Cases as % of Population",
				},
			],
		}),
		visible: false,
	});

	var provincialLayerTotalCases = new FeatureLayer({
		name: "Total Cases",
		url:
			"https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/COVID19_MAP_of_Italy_WFL1/FeatureServer/3",
		outFields: ["*"],
		renderer: new DotDensityRenderer({
			referenceDotValue: 10,
			outline: null,
			legendOptions: {
				unit: "people",
			},
			attributes: [
				{
					valueExpression: "$feature.TotC",
					color: "red",
					label: "Total Cases",
				},
			],
		}),
	});

	const allLayers = new GroupLayer({
		title: "Covid in Italy",
		visible: true,
		visibilityMode: "exclusive",
		layers: [
			provincialPop,
			provincialLayerPercentOfPop,
			provincialLayerTotalCases,
		],
	});

	map.add(allLayers);

	var layerList = new LayerList({
		view,
		statusIndicatorsVisible: false,
		listItemCreatedFunction: function (e) {
			if ((e.item.title = "Covid in Italy")) {
				e.item.open = true;
			}
			e.item.title = e.item.layer.name;
		},
	});

	view.ui.add(layerList, "top-right");

	var legend = new Legend({
		view: view,
		layerInfos: [
			{
				layer: provincialLayerTotalCases,
				title: "Total Cases",
			},
			{
				layer: provincialLayerPercentOfPop,
				title: "Cases as % of Population",
			},
			{
				layer: provincialPop,
				title: "Total Population",
			},
		],
	});

	view.ui.add(legend, "top-right");
});
