const { parse } = require("date-fns");

const parseDate = (date) => parse(date, "MM/dd/yyyy", new Date());

module.exports = { parseDate };
