var fs = require("fs");
var request = require('request');
var getContributors = require('./getContributors.js')

module.exports = {
 downloadIMG: function (imgURL, fileName) {
    request.get(imgURL, function (err, incomingMessage, responseBody) {
      if(err) {
        console.log(err);
        return;
      }
    }).pipe(fs.createWriteStream(fileName));
  },
  downloadAvatars: function (err, contObj) {
     fs.access('avatars/', function(err) {
      if (err && err.code === 'ENOENT') {
        fs.mkdir('avatars/');
      }
      for(idx in contObj) {
        var imgURL = contObj[idx].avatar_url;
        var fileName = 'avatars/' + contObj[idx].login;
        let ext = "." + incomingMessage.headers['content-type'].substr(5); // content-type returned as 'image/jpg' extracting values past the /
        fileName += ext;
        module.exports.downloadIMG(imgURL, fileName);
      }
    });
 }
}
