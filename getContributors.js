var request = require('request');
const apiRoot = 'https://api.github.com/repos/';
//////
//Function takes in a GitHub user + repo name and returns an object
//that includes responseBody information from the contributors page
module.exports = {
 getRepoContributors: function(repoOwner, repoName, callback) {
    request.get({
      url: apiRoot + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': process.env.USR,
        Authorization: 'token ' + process.env.GIT_OAUTH
      },
      json: true
    }, function (err, incomingMessage, responseBody) {
        if (err) {
         callback(err);
      } else if (incomingMessage.statusCode == 404) {
         callback(new Error("the user/repo combo does not exist"));
      } else if (incomingMessage.statusCode == 401) {
        callback(new Error("the authentication information in .env was incorrect"));
      } else {
         callback(null, responseBody);
      }
    });
  }
};
//////
///