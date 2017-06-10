#!/bin/bash
# The following script deploys the app to dokku.
# It takes the arguments <remote_name> to specify which remote exactly to
# push to eg. `./deploy.sh server1`

# check for uncommitted changes
if [[ $(git diff-index HEAD --) ]]
then
    echo 'Deploy could not be ran. There are some uncommitted changes.' && exit 1
fi

# get current branch
feature_branch=$(git rev-parse --abbrev-ref HEAD)

echo "Branching from $feature_branch"

# Check if branch exists, create it if it doesn't and checkout
if [[ $(git branch --list deploy) ]]
then
    git checkout deploy
    if [[ $(git merge $feature_branch --strategy-option theirs) ]]
    then
        echo "Successfully merged deploy with $feature_branch"
    else
        echo 'Error at git checkout and merge'
        git stash && git checkout $feature_branch
        exit 1
    fi
else
    # create branch and check out to it
    git checkout -b deploy
fi

# remove build from gitignore
if [[ -e .gitignore ]]
then
    $(sed -i '' '/\/build/d' .gitignore)
else
    echo ".gitignore doesn't exist"
    $(git stash && git checkout $feature_branch)
    exit 1
fi

echo 'Creating build(this could take a while)...'

# create distributable code
echo $(npm run build)

echo 'Finished build'

# commit
git add . && git commit -m '[Chore] Create build'

# Push to remote
if [[ $(git remote | grep "$1") ]]
then
    echo 'Pushing to dokku'
    if [[ $1 ]]
    then
        git push "$1" deploy:master --force && echo 'Pushed to dokku'
        git stash && git checkout $feature_branch
    else
        echo 'You did not provide the remote to push to when running the script'
    fi
else
    echo 'No remote provided to push to'
     $(git stash && git checkout $feature_branch)
    exit 1
fi

