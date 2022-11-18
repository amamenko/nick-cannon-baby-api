const { parseDate } = require("./parseDate");
const { intervalToDuration } = require("date-fns");

const setAgeOnHash = (babyArr) => {
  return babyArr.map((baby) => {
    if (baby.status.alive) {
      const babyBirthday = parseDate(baby.birthday);
      const timeSinceObj = intervalToDuration({
        start: babyBirthday,
        end: new Date(),
      });
      const years = timeSinceObj.years;
      const months = timeSinceObj.months;
      const days = timeSinceObj.days;
      baby.status.age.years = years;
      baby.status.age.months = months;
      baby.status.age.days = days;
      return baby;
    } else {
      return baby;
    }
  });
};

module.exports = { setAgeOnHash };
