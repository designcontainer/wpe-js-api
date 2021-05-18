// Import external deps
const axios = require('axios');

// Import internal deps
const Helper = require('./classes/class-helper');

module.exports = class WpeApi {
	constructor() {}

	installDomains = async (id) => {
		const domainsObj = await this.getWpeApi('installs', id, 'domains');
		const domains = domainsObj.results.map((item) => {
			return item['name'];
		});
		return domains;
	};

	primaryDomain = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['primary_domain'];
	};

	isMultisite = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['is_multisite'];
	};

	getWpeApi = async (...args) => {
		args = await new Helper().handleApiArgs(args);
		const urlAxios = `https://api.wpengineapi.com/v1/${args}`;

		const optionAxios = {
			headers: {
				Authorization:
					'Basic ' +
					Buffer.from(
						process.env.WPE_API_USER + ':' + process.env.WPE_API_PASS
					).toString('base64'),
			},
		};

		return axios
			.get(urlAxios, optionAxios)
			.then((res) => res.data)
			.catch((error) => {
				throw new Error(error);
			});
	};
};
