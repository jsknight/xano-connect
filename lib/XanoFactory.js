'use strict';
const XMLHttpRequest = require('xhr2');

class XanoFactory {
	_authToken = "Bearer=8654865465fjhgfjt858";

	constructor() {
		if (!XanoFactory.instance) {
			XanoFactory.instance = this
		}
		return XanoFactory.instance
	}

	get = async function (url, params = null) {
		return await this.__request('GET', url, params)
	}

	put = async function (url, params = null) {
		return await this.__request('POST', url, params)
	}
	patch = async function (url, params = null) {
		return await this.__request('POST', url, params)
	}
	delete = async function (url, params = null) {
		return await this.__request('POST', url, params)
	}
	__request = function (type = 'GET', url, params = null) {
		return new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest();
			req.open(type, url);
			req.onload = function () {
				if (req.status == 200) {
					resolve(req.response);
				}
				else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = function () {
				reject(Error("Network Error"));
			};
			let param_string = "";
			if (params) {
				params.map((x, i) => {
					let ret;
					for (let k in x) {
						ret = `${k}=${x[k]}${i ? '&' : ''}`;
					}
					return ret;

				});
			}
			req.send(param_string);
		});
	}
}

const instance = new XanoFactory()

module.exports = instance;

// Allow use of default import syntax in TypeScript
module.exports.default = instance;