var fs = require("fs");
var request = require('request');
var getContributors = require('./getContributors.js')

module.exports = {
 downloadIMG: function (imgURL, fileName) {
    request.get(imgURL, function (err, incomingMessage, responseBody) {
      if(err) {
        console.log(err);
        return;
      } else {
        ext = "." + incomingMessage.headers['content-type'].substr(5) // content-type returned as 'image/jpg' extracting values past the /
        fileName += ext
      }
    }).pipe(fs.createWriteStream(fileName));
  },
  downloadAvatars: function (err, contObj) {
    var dirName = process.argv[3] + "/"
    console.log(dirName);
      fs.mkdir(dirName, function(){
        for(idx in contObj) {
          var imgURL = contObj[idx].avatar_url;
          var fileName = dirName + contObj[idx].login;
          module.exports.downloadIMG(imgURL, fileName);
        }
      });
    }
};
// module.exports = {
//   downloadAvatars: downloadAvatars,
//   downloadIMG: downloadIMG
// };
