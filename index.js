// Import external deps
import axios from 'axios';

// Import internal deps
import Helper from './classes/class-helper'

class WpeApi {
	constructor(user, pass) {
		this.user = user;
		this.pass = pass;
	}

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
					'Basic ' + Buffer.from(this.user + ':' + this.pass).toString('base64'),
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

export default WpeApi