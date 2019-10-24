// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

var scrape = function(cb) {
  request("https://www.gameinformer.com", function(err, res, body) {
    var $ = cheerio.load(body);

    var articles = [];

    $("div.article-summary").each(function(i, element) {
      var head = $(this)
        .children(".article-title")
        .text()
        .trim();
      var sum = $(this)
        .children(".article-headline")
        .text()
        .trim();

      if (head && sum) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat
        };
        articles.push(dataToAdd);
        console.log(articles);
      }
    });
    cb(articles);
  });
};
module.exports = scrape;