const { v4: uuidv4 } = require("uuid");

const formatDate = (date) => {
  return new Date(date).toISOString().replace(/T/, " ").replace(/\..+/, "");
};

const formatDatabaseDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// const calculateNPS = (resolution, satisfaction) => {
//   let nps = (resolution + satisfaction) / 2;
//   return nps.toFixed(2);
// };
const calculateNPS =(scores) =>{
  var promoters = 0;
  var detractors = 0;
  
  for (var i=0, l=scores.length; i<l; i++) {
    if (scores[i] >= 9) promoters++;
    if (scores[i] <= 6) detractors++;
  }
  
  return Math.round(((promoters / l) - (detractors / l)) * 100);
}

const createResponseBody = (statusCode, statusDesc, data, type) => {
  const header = {
    requestRefId: uuidv4(),
    responseCode: statusCode,
    responseDesc: statusDesc,
    timestamp: formatDate(new Date()),
  };
  return type === 0 ? { header, body: data } : { header };
};

module.exports = {
  formatDate,
  calculateNPS,
  formatDatabaseDate,
  createResponseBody,
};
