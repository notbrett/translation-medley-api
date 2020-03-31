const netTranslation = require('./netTranslation');
const esvTranslation = require('./esvTranslation');
const bibliaTranslation = require('./bibliaTranslation');

module.exports = (req, res, next) => {
  switch (req.query.bible) {
    case 'NET':
      netTranslation(req, res, next);
      break;
    case 'ESV':
      esvTranslation(req, res, next);
      break;
    case 'KJV':
    case 'ASV':
    case 'DARBY':
    case 'LEB':
    case 'YLT':
      bibliaTranslation(req, res, next);
      break;
    default:
      res.status(400).json({ error: 'Unsupported bible translation' });
      break;
  } // end switch
};
