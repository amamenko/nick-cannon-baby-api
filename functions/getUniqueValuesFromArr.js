const getUniqueValuesFromArr = (arr, str) => {
  const allResults = arr.map((el) => el[str]);
  const uniqueResults = [...new Set(allResults)];
  return uniqueResults;
};

module.exports = { getUniqueValuesFromArr };
