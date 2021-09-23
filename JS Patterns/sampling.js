console.clear();

const unsampled = Array.from({ length: 5 })
	.map((_, i) => ({
		time: Math.floor(10000 * Math.random()),
		details: `This is item number ${i}`,
	}))
	.sort((a, b) => a.time - b.time);

console.log('Unsample array:\n', unsampled);

/**
 * Function to resample an array or array of objects according to a static sampling interval
 * @param {Array} originalArray Array of items to resample
 * @param {Number} samplingInterval The interval between items to sample at
 */
function resample(originalArray, samplingInterval) {
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

	/**
	 * First item in the original array is pushed to be the first item in the results array
	 */
	result.push({ ...queuedItem, sampletime: latestSampleTime });

	function shiftAndCheckAndPush() {
		/**
		 * Increment sample time
		 */
		latestSampleTime = latestSampleTime + samplingInterval;

		/**
		 * If there are still items in the original array copy
		 */
		if (array.length) {
			const nextItem = array[0];

			if (latestSampleTime > nextItem.time) {
				array.shift();
				queuedItem = nextItem;
			}

			result.push({ ...queuedItem, sampletime: latestSampleTime });

			shiftAndCheckAndPush();
		}
	}

	shiftAndCheckAndPush();

	return result;
}

const SAMPLING_INTERVAL = 1000;

const result = resample(unsampled, SAMPLING_INTERVAL);
console.log(
	`Reampled at a sampling interval of ${SAMPLING_INTERVAL}:\n`,
	result
);
