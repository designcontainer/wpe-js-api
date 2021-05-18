const querystring = require('querystring');

module.exports = class Helper {
	constructor() {}

	isObject = (arg) => {
		if (typeof arg === 'object' && arg !== null) {
			return true;
		}
		return false;
	};

	handleApiArgs = (args) => {
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

	objectToFlags = (args) => {
		let flagsString = '';
		for (const [key, value] of Object.entries(args)) {
			let formattedKey = key.replace('_', '-');
			let prefix = key.length === 1 ? '-' : '--';
			flagsString += `${prefix}${formattedKey}=${value} `;
		}
		return flagsString;
	};
};
