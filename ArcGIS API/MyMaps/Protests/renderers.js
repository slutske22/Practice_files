export const racialRenderer = {
   type: "simple", // autocasts as new SimpleRenderer()
   symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: "rgba(153, 51, 51, 0.5)",
      size: '3px',
      outline: {
         color: "rgb(153, 51, 51)",
         width: 0.5
      }
   },
   visualVariables: [
      {
         type: 'size',
         field: 'Attendees',
         stops: [
            {
              value: 1, 
              size: 3 
            },
            {
              value: 500, 
              size: 10 
            },
            {
               value: 100000, 
               size: 30 
             }
         ]
      }
   ]
};


export const nonRacialRenderer = {
   type: "simple", // autocasts as new SimpleRenderer()
   symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: "rgba(124,185,232, 0.5)",
      size: '3px',
      outline: {
         color: "rgb(124,185,232)",
         width: 0.5
      }
   },
   visualVariables: [
      {
         type: 'size',
         field: 'Attendees',
         stops: [
            {
              value: 1, 
              size: 3 
            },
            {
              value: 500, 
              size: 10 
            },
            {
               value: 100000, 
               size: 30 
             }
         ]
      }
   ]
};