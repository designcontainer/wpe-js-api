import querystring from 'querystring';

/**
 * Class containing module helper methods.
 */
class Helper {
	constructor() {}

	/**
	 * Check if arg is Object.
	 *
	 * @param {any} arg The data you want to check if object.
	 * @return {bool} Returns boolean true/false depending on if arg is object.
	 */
	isObject = (arg) => {
		if (typeof arg === 'object' && arg !== null) {
			return true;
		}
		return false;
	};

	/**
	 * Return a query string from arguments.
	 * Used for handing data to API requests / Axios.
	 *
	 * @param {any} args The API arguments
	 * @return {string} Returns a formatted query string.
	 */
	handleGetApiArgs = (args) => {
		let names = [];
		let queries = [];
		args.forEach((arg) => {
			if (this.isObject(arg) === false) {
				names.push(arg);
			} else {
				queries.push(arg);
			}
		});
		names = names.join('/');
		queries = `?${querystring.encode(queries)}`;
		return names + queries;
	};

	/**
	 * Return a object from arguments.
	 * Used for posting data to API requests / Axios.
	 *
	 * @param {any} args The API arguments
	 * @return {string} Returns a an object containing slug and formData.
	 */
	handlePostApiArgs = (args) => {
		let slug = [];
		let formData = [];
		args.forEach((arg) => {
			if (this.isObject(arg) === false) {
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
	};
}

export default Helper;
