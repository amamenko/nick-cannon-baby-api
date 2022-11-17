const getUniqueValuesFromArr = (arr, str) => {
  const allResults = arr.map((wow) => wow[str]);
  const uniqueResults = [...new Set(allResults)];
  return uniqueResults;
};

module.exports = { getUniqueValuesFromArr };
