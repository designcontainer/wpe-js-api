import querystring from 'querystring';

/**
 * Check if arg is Object.
 *
 * @param {any} arg The data you want to check if object.
 * @return {bool} Returns boolean true/false depending on if arg is object.
 */
export function isObject(arg) {
	if (typeof arg === 'object' && arg !== null) {
		return true;
	}
	return false;
}

/**
 * Return a query string from arguments.
 * Used for handing data to API requests / Axios.
 *
 * @param {any} args The API arguments
 * @return {string} Returns a formatted query string.
 */
export function handleGetApiArgs(args) {
	let names = [];
	let queries = [];
	args.forEach((arg) => {
		if (isObject(arg) === false) {
			names.push(arg);
		} else {
			queries.push(arg);
		}
	});
	names = names.join('/');
	queries = `?${querystring.encode(queries)}`;
	return names + queries;
}

/**
 * Return a object from arguments.
 * Used for posting data to API requests / Axios.
 *
 * @param {any} args The API arguments
 * @return {string} Returns a an object containing slug and formData.
 */
export function handlePostApiArgs(args) {
	let slug = [];
	let formData = [];
	args.forEach((arg) => {
		if (isObject(arg) === false) {
			slug.push(arg);
		} else {
			formData.push(arg);
		}
	});
	slug = slug.join('/');
	return {
		slug,
		formData,
	};
}

/**
 * Genereate a unix time stamp from current time.
 *
 * @return {string}
 */
export function generateTimestamp() {
	return new Date().getTime();
}
