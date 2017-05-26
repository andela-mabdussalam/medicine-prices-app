const fs = require('fs');
const exec = require('child_process').exec;
/*
* A deployment script for pushing the app to dokku
*/

// remove /build from gitignore
function removeBuildFromGitignore() {
  fs.readFile("./.gitignore", 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/\/build/, '');
    fs.writeFile("./.gitignore", result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
    console.log("Creating build(this could take a while)...");
    createBuild();
  });
}

// checkout to deploy branch creating it if it doesn't exist
function branchAndMerge(featureBranch) {
  exec(`git checkout deploy || git checkout -b deploy && git merge ${featureBranch}`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit(1);
    }
    console.log(stdout);
    removeBuildFromGitignore();
  })
}

// create distributable code
function createBuild() {
  exec(`npm run build`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit(1);
    }
    console.log(stdout);
    commitBuild();
  });
}

// add build and make commit
function commitBuild() {
  exec(`git add . && git commit -m "[Chore] Create build"`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit(1);
    }
    console.log(stdout);
    getRemoteAndPush();
  })
}

// push build to dokku
function pushBuild() {
  exec(`git push dokku deploy:master`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit(1);
    }
    console.log(stdout);
    console.log("Pushed to dokku!");
    exec(`git checkout ${featureBranch}`);
  })
}

// check for remote and if it exists push build
function getRemoteAndPush() {
  exec(`git remote`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit(1);
    }
    if (!stdout.includes("dev")) {
      console.log("[ERROR] No remote named 'dokku' found");
      process.exit(1);
    }
    console.log("Pushing to dokku...");
    pushBuild();
  }
  );
}

// get current branch and create deploy and merge if we're not in deploy
var featureBranch;
function getCurrentBranch() {
  exec(`git rev-parse --abbrev-ref HEAD`, function (error, branchName, stderr) {
    featureBranch = branchName;
    if (featureBranch.includes('deploy')) {
      console.log("Cannot run deploy script from the deploy branch. You need to be in a feature branch.");
      process.exit(1);
    }
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit(1);
    }
    branchAndMerge(featureBranch);
  })
}

// iff no uncommitted changes, get the current branch
function checkForUncommittedChanges() {
  exec(`git diff --shortstat`, function (error, stdout, stderr) {
    if (stdout) {
      console.log("Deploy could not be ran. There are some uncommitted changes.");
      process.exit(1);
    }
    if (error !== null) {
      console.log('exec error: ' + error);
      process.exit(1);
    }
    getCurrentBranch();
  })
}

checkForUncommittedChanges();
