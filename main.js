var downloadAvatars = require("./downloadAvatars.js");
var getContributors = require("./getContributors.js");
var fs = require("fs");

function main (){
  if(process.argv.length !== 4) {
    console.log("You have not entered the right number of arguments.\nInput should resemble: 'node main.js repoOwner repoName'")
    return;
  }

  try {
    fs.statSync('.env');
  } catch(err) {
    console.log("Please use npm dotenv conventions for storing the username and tokens");
    return;
  }

  require('dotenv').config();
  if (process.env.GIT_OAUTH === undefined || process.env.USR === undefined){
    console.log('Follow appropriate naming conventions in the .env file');
    return;
  }
//If above error tests fail run the Function:
  getContributors.getRepoContributors(process.argv[2], process.argv[3], function(err, contObj) {
    if(err) {
      console.log('There was an error: ' + err.message);
    } else {
      downloadAvatars.downloadAvatars(err, contObj);
    }
  });
}
//Run app
main();

