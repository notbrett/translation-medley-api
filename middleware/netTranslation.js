const axios = require('axios');

module.exports = (req, res, next) => {
  const params = req.query;
  let location;
  if (params.verseRange) {
    location = `${params.book} ${params.chapter}:${params.verseRange}`;
  } else {
    location = `${params.book} ${params.chapter}`;
  }
  const url = encodeURI(
    `https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${location}&type=json`
  );
  axios
    .get(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(res => {
      const text = res.data;
      return Object.fromEntries(text.map(el => [[el.verse], el.text]));
    })
    .then(cleanText => {
      req.data = {
        passage: params,
        content: cleanText
      };
      next();
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Problem fetching from NET', error: err });
    });
};
