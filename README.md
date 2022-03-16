# What it is
A module to perform deep partial compare of objects with the option to match string values of different cases even for circular objects.

# Why this now?

There are many good object comparison modules out there! Please don't use this if all you want is to compare object for similarity.

This module is slightly different.

Imagine you have a large object ```object``` and want to check that all the values in another object ```comp``` partially match those in ```object```, with the added advantage that you can make the matching of string values case insensitive.

Here is a quick example.

```javascript

const pCaseComp = require('.');

let object = {
		isBusy: true,
		country: 'Kenya',
		countryCode: 'KE',
		city: 'Nairobi',
		lat: -1.2841,
		lon: 36.8155
	};

let compObj = { isBusy: true, country:"KEnYa  " };

// Lets have circular keys to compare
object.circular_ref = object;
compObj.circular_ref = object;

let comp = pCaseComp(object, compObj, true, true);

console.log(comp);
//returns { match: true, keys: [] }

```

**Note:**

1. Circular references are handled and actually matched against too!
2. Not all keys in the ```object``` exist in ```compObj``` 
3. The key ```country``` matched ```"KEnYa  "=="Kenya"``` even if they have different cases.
4. If objects don't match then return value looks something like this: 

    ```javascript 
    { match: false, keys: [ 'lat', 'circular_ref' ] }
    ```
    Where ```keys``` is an array of all non matching keys.

## API
### ```compare(obj:object, filter:object, [caseInsensitive:boolean, ignoreMissingKeys:boolean])```

In the above example, we are comparing with ```caseInsensitive``` and ```ignoreMissingKeys``` set to **true**. 

Case Insensitive mode not only ignores the case used in string values but also trims them.

Toggling either parameter will have the opposite effect.

# Use Case

I wanted a quick way to filter objects using a filter options entered by API users. A user can use as many filter options as possible and not worry about case sensitivity or white space.

What's you use case? Share!