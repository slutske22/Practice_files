export const provincialPopup = {
	title: "{NAME_1}",
	content: `
       <div class="covid-popup">
          <div class="case-group">
			<p>Total Cases: <b>{Total_Cases}</b></p>
			<p>Confirmed Deaths: <b>{Confirmed_Deaths}</b></p>
			<p>Cases as % of Population: <b>{Infections_Population }</b></p>
          </div>
       </div>`,
	fieldInfos: [
		{
			fieldName: "TotR",
			format: {
				digitSeparator: true,
				places: 0,
			},
		},
		{
			fieldName: "Total_Cases ",
			format: {
				digitSeparator: true,
				places: 0,
			},
		},
	],
};

export const municipalPopup = {
	title: "{NAME_2 }",
	content: `
       <div class="covid-popup">
          <div class="case-group">
            <p>Total Cases: <b>{Total_Cases}</b></p>
            <p>Infection as % of Popuplation: <b>{Infections_Population}</b></p>
          </div>
       </div>`,
	fieldInfos: [
		{
			fieldName: "Infections_Population",
			format: {
				digitSeparator: true,
				places: 0,
			},
		},
		{
			fieldName: "Total_Cases ",
			format: {
				digitSeparator: true,
				places: 0,
			},
		},
	],
};
