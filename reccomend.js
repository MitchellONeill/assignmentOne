var fs = require("fs");
var request = require('request');
require('dotenv').config();
const apiRoot = 'https://api.github.com/repos/';

function reccomend(repoOwner, repoName) {
  request.get({
      url: apiRoot + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': process.env.USR,
        Authorization: 'token ' + process.env.GIT_OAUTH,
      },
      json: true
    }, function(err, incomingMessage, responseBody) {
     // console.log(incomingMessage);
      console.log(forEach(responseBody.login));
    });
  }


reccomend('lighthouse-labs', 'laser_shark');