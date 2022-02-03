function keyValueToString([key, value]) {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check out params');
  }

  return `${key}=${value}`;
}

module.exports.queryString = obj =>
  Object.entries(obj).map(keyValueToString).join('&');

module.exports.parse = string =>
  Object.fromEntries(
    string.split('&').map(item => {
      let [key, value] = item.split('=');

      if (value.indexOf(',') > -1) {
        value = value.split(',');
      }

      return [key, value];
    }),
  );

/**
 * indexOf()
 *  - returns the first index at which a given element
 * -  can be found in the array, or -1 if it is not present.
 */
