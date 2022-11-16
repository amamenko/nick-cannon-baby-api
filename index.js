const express = require("express");
const app = express();
const sampleSize = require("lodash.samplesize");
const { babiesArr } = require("./babiesArr");

const port = process.env.PORT || 3000;

app.get("/babies/random", (req, res) => {
  const numResults = Number(req.query.results);
  let randomBaby = sampleSize(babiesArr, numResults || 1);
  res.send(randomBaby);
});

const getUniqueValuesFromArr = (arr, str) => {
  const allResults = arr.map((wow) => wow[str]);
  const uniqueResults = [...new Set(allResults)];
  return uniqueResults;
};

app.get("/babies/mothers", (req, res) => {
  res.send(getUniqueValuesFromArr(babiesArr, "mother"));
});

app.get("/babies/names", (req, res) => {
  res.send(getUniqueValuesFromArr(babiesArr, "name"));
});

app.get("/", (req, res) => {
  res.json("The Nick Cannon Baby API is up and running! 👋");
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
