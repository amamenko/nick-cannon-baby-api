const express = require("express");
const app = express();
const sampleSize = require("lodash.samplesize");
const { babiesArr } = require("./babiesArr");
const {
  getUniqueValuesFromArr,
} = require("./functions/getUniqueValuesFromArr");
const { isWithinInterval } = require("date-fns");
const enforce = require("express-sslify");
const cors = require("cors");
const { setAgeOnHash } = require("./functions/setAgeOnHash");
const { parseDate } = require("./functions/parseDate");
require("dotenv").config();

const port = process.env.PORT || 4000;

// Enable all cross-origin requests
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.get("/babies/random", (req, res) => {
  // Parameters
  const numResults = Number(req.query.results);
  const mother = req.query.mother;
  const childOrderNumber = Number(req.query.child_order_number);
  const totalChildrenWithMother = Number(req.query.total_children_with_mother);
  const twin = req.query.twin;
  const gender = req.query.gender;
  const queryDate = req.query.date ? parseDate(req.query.date) : "";

  let babiesCopyArr = [...babiesArr];

  if (queryDate) {
    babiesCopyArr = babiesCopyArr.filter((baby) => {
      const startOuter = parseDate(baby.approximate_conception_date);
      const endOuter = parseDate(baby.birthday);
      return isWithinInterval(queryDate, {
        start: startOuter,
        end: endOuter,
      });
    });
  }

  if (mother) {
    babiesCopyArr = babiesCopyArr.filter(
      (baby) => baby.mother.toLowerCase() === mother.toLowerCase()
    );
  }

  if (childOrderNumber) {
    babiesCopyArr = babiesCopyArr.filter(
      (baby) => baby.current_child_with_mother === childOrderNumber
    );
  }

  if (totalChildrenWithMother) {
    babiesCopyArr = babiesCopyArr.filter(
      (baby) => baby.total_children_with_mother === totalChildrenWithMother
    );
  }

  if (twin === "true") {
    babiesCopyArr = babiesCopyArr.filter((baby) => baby.twin === true);
  } else {
    if (twin === "false")
      babiesCopyArr = babiesCopyArr.filter((baby) => baby.twin === false);
  }

  if (gender === "male") {
    babiesCopyArr = babiesCopyArr.filter((baby) => baby.gender === "male");
  } else {
    if (gender === "female")
      babiesCopyArr = babiesCopyArr.filter((baby) => baby.gender === "female");
  }

  babiesCopyArr = setAgeOnHash(babiesCopyArr);

  const babyResults = sampleSize(babiesCopyArr, numResults || 1);
  res.send(babyResults);
});

app.get("/babies/ordered/:index?", (req, res) => {
  if (req.params.index) {
    if (Number(req.params.index) || req.params.index === "0") {
      if (babiesArr[Number(req.params.index)]) {
        let resultArr = [babiesArr[Number(req.params.index)]];
        resultArr = setAgeOnHash(resultArr);
        res.send(resultArr);
      } else {
        res.send([]);
      }
    } else {
      const digitDashRegex = /^\d{1,2}-+\d{1,2}/gm;
      if (digitDashRegex.test(req.params.index)) {
        const splitIndeces = req.params.index.split("-");
        const firstNum = Number(splitIndeces[0]);
        const secondNum = Number(splitIndeces[1]);
        if ((firstNum || firstNum === 0) && (secondNum || secondNum === 0)) {
          let result = babiesArr.slice(firstNum, secondNum + 1);
          result = setAgeOnHash(result);
          res.send(result);
        } else {
          res
            .status(400)
            .send(
              "400 Bad Request: Index should be a number or a range between two numbers"
            );
        }
      } else {
        res
          .status(400)
          .send(
            "400 Bad Request: Index should be a number or a range between two numbers"
          );
      }
    }
  } else {
    res.redirect("/babies/ordered/0");
  }
  return;
});

app.get("/babies/mothers", (req, res) => {
  res.send(getUniqueValuesFromArr(babiesArr, "mother"));
});

app.get("/babies/names", (req, res) => {
  res.send(getUniqueValuesFromArr(babiesArr, "name"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // Redirect to root in case no path match
  app.use((req, res, next) => {
    if (req.path !== "/") {
      return res.redirect("/");
    }
    next();
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.redirect("/");
  });
}

app.listen(port, () => console.log(`Listening on port ${port}.`));
