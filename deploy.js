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
// checkout to deploy branch creating it if it doesn't exist and resetting it if it does
exec(`git checkout -B test-deploy && git merge ${featureBranch}`, function (error, stdout, stderr) {
  if (error !== null) {
    console.log('exec error: ' + error);
    process.exit(1);
  }
  console.log(stdout);
  removeBuildFromGitignore();
  console.log("Running build...");
  createBuild();
})
