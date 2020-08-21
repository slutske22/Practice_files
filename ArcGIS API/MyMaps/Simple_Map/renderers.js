export const defaultSymbol = {
   type: "simple-fill", // autocasts as new SimpleFillSymbol()
   outline: {
      // autocasts as new SimpleLineSymbol()
      color: [128, 128, 128, 0.2],
      width: "0.5px"
   }
}

export const totalCases = (minValue = 0, maxValue) => ({
   type: "simple",
   symbol: defaultSymbol,
   label: "US County",
   visualVariables: [
      {
         type: "color",
         field: "totCases",
         legendOptions: {
            title: "Total cases per US county"
          },
          stops: [
            {
               value: minValue,
               color: "#ebe6df",
               label: "0"
            },
            {
               value: 500,
               color: "#7bccc4",
               label: "500"
            },
            {
               value: 11000,
               color: "#436480",
               label: "11,000"
            },
            {
               value: maxValue,
               color: "#002624",
               label: maxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") // format number with commas
            }
         ]
      }
   ]
})