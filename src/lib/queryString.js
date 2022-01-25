module.exports.queryString = obj => {
  const srt = Object.entries(obj)
    .map(item => `${item[0]}=${item[1]}`)
    .join('&');

  return srt;
};
