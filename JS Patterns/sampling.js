/**
 * Function to resample an array or array of objects according to a static sampling interval
 *
 * Described visually by Stack Overflow question [Resampling an array of objects](https://scicomp.stackexchange.com/questions/40065/resampling-an-array-of-objects)
 * @param {Array} originalArray Array of items to resample
 * @param {Number} samplingInterval The interval between items to sample at
 */
function resample(originalArray, samplingInterval, transform) {
	/**
	 * Copy array
	 */
	const array = [...originalArray];

	/**
	 * Array to hold results, initialize as empty array and then add to it as we loop through the original array
	 */
	const result = [];

	/**
	 * Take the first item in the array
	 */
	let queuedItem = array.shift();

	/**
	 * The very first item in the original array's time
	 */
	let t0 = queuedItem.time;

	/**
	 * The time of the very first item in the original array becomes the time of the first sampled item
	 */
	let latestSampleTime = t0;

	function transformedResult() {
		var transformed = queuedItem;

		if (transform) {
			const { transformationFunction, newSampleTimeName } = transform;

			if (transformationFunction) {
				transformed = transformationFunction(queuedItem);
			}

			if (newSampleTimeName) {
				transformed[newSampleTimeName] = latestSampleTime;
			}
		}

		return transformed;
	}

	/**
	 * First item in the original array is pushed to be the first item in the results array
	 */
	result.push(transformedResult());

	/**
	 * Recursive function to iterate over the sample time, starting from t0, until the current
	 * sample time is greater than the t of the last item in originalArray
	 */
	function shiftAndCheckAndPush() {
		/**
		 * Increment sample time
		 */
		latestSampleTime = latestSampleTime + samplingInterval;

		/**
		 * Recusive function to check if the latest sample time is greater than the next item in the array's time,
		 * and if so, to pop that item off and set the queued item to that next item
		 */
		function shiftAndCheck() {
			/**
			 * If there are still items in the original array copy
			 */
			if (array.length) {
				const nextItem = array[0];

				if (latestSampleTime >= nextItem.time) {
					array.shift();
					queuedItem = nextItem;
					shiftAndCheck();
				}
			}
		}

		/**
		 * If there are still items in the original array copy
		 */
		if (array.length) {
			/**
			 * Iterate through next items in array until latestSampleTime >= next item in array
			 */
			shiftAndCheck();

			/**
			 * Push the queued item into the results
			 */
			result.push(transformedResult());

			/**
			 * Iterate over next sampling interval
			 */
			shiftAndCheckAndPush();
		}
	}

	shiftAndCheckAndPush();

	return result;
}

// ------------------------- Example 1 -------------------------------

console.clear();

const unsampled = Array.from({ length: 10 })
	.map((_, i) => ({
		time: Math.floor(10000 * Math.random()),
		details: `This is item number ${i}`,
	}))
	.sort((a, b) => a.time - b.time);

console.log('Unsample array:\n', unsampled);

const SAMPLING_INTERVAL = 2000;

const result = resample(unsampled, SAMPLING_INTERVAL, {
	transformationFunction: (item) => ({ ...item }),
	newSampleTimeName: 'newTime',
});

console.log(
	`Reampled at a sampling interval of ${SAMPLING_INTERVAL}:\n`,
	result
);

// console.log(
// 	resample(
// 		[
// 			{
// 				time: 0,
// 				details: 'Item 1',
// 			},
// 			{
// 				time: 10,
// 				details: 'Item 2',
// 			},
// 			{
// 				time: 22,
// 				details: 'Item 3',
// 			},
// 		],
// 		10,
// 		{ newSampleTimeName: 'newTime' }
// 	)
// );
