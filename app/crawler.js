/**
 * Copyright (C) 2017 Menome Technologies.
 *
 * Crawls a file tree, copies it, and turns it into graph nodes.
 */
const createClient = require('webdav');
const async = require('async');

module.exports = function crawler(bot) {
  this.crawlAll = function() {

    var davClient = createClient(
      bot.config.get("crawler.host"),
      bot.config.get("crawler.username"),
      bot.config.get("crawler.password")
    )
    
    var crawledCount = 0;

    var getDirLevel = (path) => {
      return davClient.getDirectoryContents(path).then((results) => {
        var nextDirs = []

        results.forEach((result) => {
          if(result.type === 'file') {
            crawledCount += 1;
            bot.rabbit.publishMessage({
              Library: bot.config.get("crawler.librarykey"),
              Path: result.filename,
              EventType: "CREATE",
              Size: result.size,
              Timestamp: new Date().toISOString()
            })
          }
          else if(result.type === 'directory')
            nextDirs.push(result)
        })

        return new Promise((resolve,reject) => {
          async.eachOfSeries(nextDirs, (itm,key,cb) => {
            console.log(itm.filename);
            getDirLevel(itm.filename).then(cb);
          }, (err) => {
            if(err) reject(err)
            resolve()
          })
        })
      })
    }

    return getDirLevel("/").then(() => {
      console.log("Done")
      return crawledCount
    });
  }
}
