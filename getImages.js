var getContributors = require("./getContributors.js")
var fs = require("fs");

var contObj =  getContributors('lighthouse-labs', 'laser_shark', function(err, contList) {
  return contList;
});


var imgURL = {}
  for(idx in contObj){
      imgURL[idx] = contObj[idx].avatar_url;
    }
  console.log("Result: ", imgURL);

