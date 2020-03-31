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
    `https://cors-anywhere.herokuapp.com/https://api.biblia.com/v1/bible/content/${params.bible}.json?passage=${location}&style=oneVersePerLine&key=${process.env.BIBLIA}`
  );

  axios
    .get(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(res => {
      const text = res.data.text;
      return Object.fromEntries(
        text
          .split(/\r\n/)
          .splice(1, text.length - 1)
          .map(el => el.split(/(?<=[0-9])(?=[\D])/))
      );
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
        .json({ message: 'Problem fetching from Biblia', error: err });
    });
};
