var helpers = require('@menome/botframework/helpers');

module.exports.swaggerDef = {
  "/crawl": {
    "x-swagger-router-controller": "crawl",
    "post": {
      "description": "Crawl",
      "summary": "Crawl all filesystems. Send updates to queue.",
      "tags": [
        "Librarian"
      ],
      "responses": {
        "200": {
          "description": "Success"
        },
        "default": {
          "description": "Error"
        }
      }
    }
  }
}

module.exports.post = function(req,res) {
  res.send(helpers.responseWrapper({message: "Starting Full Crawl"}))

  return req.crawler.crawlAll().then((result) => {
    req.bot.logger.info("Finished crawling "+result+" files.")
  }).catch((err) => {
    req.bot.logger.error("Failed to crawl: ", err);
  });
}