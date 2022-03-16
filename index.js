// Copyright 2022 Anthony Mugendi
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const dotObject = require('dot-object'),
	util = require('util');

function stringify(val, caseInsensitive = true) {
	if (typeof val == 'string' && caseInsensitive) {
		val = val.toLowerCase().trim();
	}

	return val;
}

// flatten remove all circular references and
// replace them with their string representations so they can be matched too
function remove_circular(obj, indent = 2) {
	let cache = [];
	const retVal = JSON.stringify(
		obj,
		(key, value) =>
			typeof value === 'object' && value !== null
				? cache.includes(value)
					? util.inspect(value) // Duplicate reference found, discard key
					: cache.push(value) && value // Store value in our collection
				: value,
		indent
	);
	cache = null;
	return JSON.parse(retVal);
}

// validate types
function validate_type(obj, type, param) {
	if (type == 'object' && (typeof obj !== 'object' || obj == null)) {
		throw new Error(param + ' parameter expects a valid object');
	} else if (type == 'boolean' && typeof obj !== 'boolean') {
		throw new Error(param + ' parameter expects a boolean');
	}
}

function compare(obj, filter, caseInsensitive = false, ignoreMissingKeys = false) {
	// sanity checks
	validate_type(obj, 'object', 'First');
	validate_type(filter, 'object', 'Second');
	validate_type(caseInsensitive, 'boolean', 'Third');
	validate_type(ignoreMissingKeys, 'boolean', 'Fourth');

	//remove circular refrences
	obj = remove_circular(obj);
	filter = remove_circular(filter);

	// flatten object to notation to handle nesting
	obj = dotObject.dot(obj);
	filter = dotObject.dot(filter);

	let a,
		b,
		keys = [];

	for (let k in obj) {
		a = stringify(obj[k], caseInsensitive);
		b = stringify(filter[k], caseInsensitive);

		// if mismatch, reject
		if (
			// if values dont match and
			a !== b && //we are not ignoring missing keys or
			(!ignoreMissingKeys ||
				//non of the values is undefined as a result of missing keys
				(a !== undefined && b !== undefined))
		) {
			keys.push(k);
		}
	}

	return {
		match: keys.length === 0,
		keys,
	};
}

module.exports = compare;
