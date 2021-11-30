// Import external deps
import axios from 'axios';

import { handleGetApiArgs, handlePostApiArgs, generateTimestamp } from './util.js';

/**
 * Class for communicating with the WP Engine API using JavaScript.
 *
 * @param {string} user The WP Engine API User.
 * @param {string} pass The WP Engine API Password/key.
 */
class WpeApi {
	constructor(user, pass) {
		this.user = user;
		this.pass = pass;
		this.cache = null;
	}

	/**
	 * Get custom WP Engine data.
	 *
	 * @param {any} args Api arguments. Docs: https://wpengineapi.com.
	 * @return {object} Returns api data.
	 */
	getWpeApi = async (...args) => {
		args = handleGetApiArgs(args);

		// Check if we have a cached response that is not older than 10 seconds, return that.
		const timeNow = generateTimestamp();

		if (this?.cache?.args === args && timeNow - this?.cache?.time < 10000) {
			return this.cache.data;
		}

		const urlAxios = `https://api.wpengineapi.com/v1/${args}`;
		const optionAxios = {
			headers: {
				Authorization: 'Basic ' + Buffer.from(this.user + ':' + this.pass).toString('base64'),
			},
		};

		try {
			const res = await axios.get(urlAxios, optionAxios);

			this.cache = {
				args: args,
				data: res.data,
				time: timeNow,
			};

			return res.data;
		} catch (error) {
			throw new Error(error);
		}
	};

	/**
	 * Post custom WP Engine data.
	 *
	 * @param {any} args Api arguments. Docs: https://wpengineapi.com.
	 * @return {object} Returns api response.
	 */
	postWpeApi = async (...args) => {
		args = handlePostApiArgs(args);
		const urlAxios = `https://api.wpengineapi.com/v1/${args.slug}`;
		const formDataAxios = args.formData[0];
		const optionAxios = {
			headers: {
				Authorization: 'Basic ' + Buffer.from(this.user + ':' + this.pass).toString('base64'),
			},
		};

		try {
			const res = axios.post(urlAxios, formDataAxios, optionAxios);
			return res.data;
		} catch (error) {
			throw new Error(error);
		}
	};

	/**
	 * Get WP Engine install ID by name.
	 *
	 * @param {string} name The WP Engine install Name.
	 * @return {string} Returns the WP Engine install ID.
	 */
	id = async (name) => {
		const data = await this.getWpeApi('installs', { limit: 1000 });
		const installs = data.results;
		const install = installs.find((installObj) => {
			return installObj.name === name;
		});
		return install['id'];
	};

	/**
	 * Get WP Engine install name by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {string} Returns the WP Engine install name.
	 */
	name = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['name'];
	};

	/**
	 * Get WP Engine install domains by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {array} Returns the WP Engine install domains.
	 */
	domains = async (id) => {
		const domainsObj = await this.getWpeApi('installs', id, 'domains');
		const domains = domainsObj.results.map((item) => {
			return item['name'];
		});
		return domains;
	};

	/**
	 * Get the PHP version of the WP Engine install by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {string} Returns the PHP version of the WP Engine install.
	 */
	phpVersion = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['php_version'];
	};

	/**
	 * Get the status of the WP Engine install by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {string} Returns the status of the WP Engine install.
	 */
	status = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['status'];
	};

	/**
	 * Get the CNAME of the WP Engine install by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {string} Returns the CNAME of the WP Engine install.
	 */
	cname = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['cname'];
	};

	/**
	 * Get the WP Engine install environment by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {string} Returns the WP Engine install environment.
	 */
	environment = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['environment'];
	};

	/**
	 * Get WP Engine primary install domain by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {string} Returns the WP Engine install primary domain.
	 */
	primaryDomain = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['primary_domain'];
	};

	/**
	 * Check if WP Engine install is a multisite environment by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @return {bool} Returns boolean true/false depending on if install is a multisite environment.
	 */
	isMultisite = async (id) => {
		const res = await this.getWpeApi('installs', id);
		return res['is_multisite'];
	};

	/**
	 * Creates a new WP Engine Backup by ID.
	 *
	 * @param {string} id The WP Engine install ID.
	 * @param {string} description Backup description.
	 * @param {Array} notification_emails Backup notification email addresses.
	 * @return {object} Returns backup response.
	 */
	newBackup = async (id, description, notification_emails) => {
		const res = await this.postWpeApi('installs', id, 'backups', {
			description,
			notification_emails,
		});
		return res;
	};
}

export default WpeApi;
