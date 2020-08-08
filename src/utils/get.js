/**
 * Perform GET Request to given url transforming
 * queryParams object to query string
 * @param {string} url
 * @param {object} queryParams
 * @returns {Promise}
 */
export default function (url, queryParams = {}) {
  const q = Object.keys(queryParams)
    .reduce((prev, curr, i) => {
      let currentParam = `${curr}=${queryParams[curr]}`
      if (i > 0) {
        currentParam = '&' + currentParam
      }

      return prev + currentParam
    }, '?')

  return fetch(url + q).then(response => response.json())
}
