import querystring from 'querystring';

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
};
