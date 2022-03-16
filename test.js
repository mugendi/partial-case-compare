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
// limitations under the License

const pCaseComp = require('.');

let object = {
		isBusy: true,
		country: 'Kenya',
		countryCode: 'KE',
		city: 'Nairobi',
		lat: -1.2841,
		lon: 36.8155
	},
	compObj = { isBusy: true, country:"KEnYa  " };

    // Lets have circular keys to compare
    object.circular_ref = object
    compObj.circular_ref = compObj;

let comp = pCaseComp(object, compObj, true, true);


console.log(comp);
