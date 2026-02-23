const UrlShchema = require("../models/urlshort");
const { generateRandomString } = require("../libs/utils");

const urlShortener = async (req, res, next) => {
  const urlString = `${process.env.SITE_URL}/${generateRandomString()}`;

  console.log(test)

  const url = req.body.url;
  const time = +req.body.time;

  const shortedUrl = new UrlShchema({
    url: url,
    shortUrl: urlString,
    expire: Date.now() + time,
  });

  await shortedUrl.save();
  res.redirect(process.env.FRONTEND_URL);
};

const shortenedUrls = async (req, res, next) => {
  const urls = await UrlShchema.find({ expire: { $gte: Date.now() } });
  res.status(200).json({
    urls: urls,
  });
};

const deleteUrls = async (req, res, next) => {
  const urlId = req.params.urlId;

  await UrlShchema.findByIdAndRemove(urlId);
  res.status(200).json({
    message: "Deleted post.",
  });
};

const resolveUrl = async (req, res, next) => {
  const shortUrl = `${process.env.SITE_URL}/${req.params.shortCode}`;
  const result = await UrlShchema.findOne({
    shortUrl,
    expire: { $gte: Date.now() },
  });

  if (result) {
    return res.redirect(result.url);
  }

  return res.status(500).json({ error: "Not found" });
};

module.exports = {
  urlShortener,
  shortenedUrls,
  deleteUrls,
  resolveUrl,
};
