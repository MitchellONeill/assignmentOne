
require('dotenv').config();
var request = require('request');
const apiRoot = 'https://api.github.com/repos/';
//////
//Function takes in a GitHub user + repo name and returns an object
//that includes responseBody information from the contributors page
function getRepoContributors(repoOwner, repoName, cb) {
  request.get({
    url: apiRoot + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': process.env.USR,
      Authorization: 'token ' + process.env.GIT_OAUTH,
    },
    json: true
  }, function (err, incomingMessage, responseBody) {
      if(err) {
        console.log(err);
        return;
      } else {
          var contObj = responseBody;
      }
    cb(err, contObj);
    });
};
//////
///
var fs = require("fs");

function downloadAvatars(err, contObj) {
  fs.mkdir('./avatars/', function(){
    for(idx in contObj) {
      var imgURL = contObj[idx].avatar_url;
      //console.log(imgURL);
      var fileName = './avatars/' + contObj[idx].login;
      downloadImg(imgURL, fileName);
    }
  });
}
//////
function downloadImg(imgURL, fileName) {
  request.get(imgURL, function (err, incomingMessage, responseBody) {
      if(err) {
        console.log(err);
        return;
      } else {
       ext = "." + incomingMessage.headers['content-type'].substr(5)
       fileName += ext
      }
    }).pipe(fs.createWriteStream(fileName));
  }



//fs help create write stream.
getRepoContributors(process.argv[2], process.argv[3], downloadAvatars);