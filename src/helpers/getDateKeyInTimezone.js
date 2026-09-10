function getDateKeyInTimezone(date = new Date(), timeZone = "Asia/Manila") {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(date, numberOfDays) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + numberOfDays);
  return result;
}

module.exports = getDateKeyInTimezone;
