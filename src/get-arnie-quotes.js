const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  // convert url to fetch promises
  const fetchPromises = urls.map((url) => {
    return httpGet(url);
  });
  // await all promises in parallel
  const fetchResults = await Promise.all(fetchPromises);

  // requirement logic 
  const results = fetchResults.map((fetchResult) => {
    // message will be extracted regardless of the fetch result status
    const message = JSON.parse(fetchResult.body).message;
    return fetchResult.status === 200 // status will determine the key
      ? { "Arnie Quote": message }
      : { FAILURE: message };
  });
  return results;
};

module.exports = {
  getArnieQuotes,
};
