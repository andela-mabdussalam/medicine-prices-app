import fs from 'fs';
/*
* A deployment script for pushing the app to dokku
*/
fs.readFile("./.gitignore", 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/string to be replaced/g, 'replacement');
  fs.writeFile(someFile, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
