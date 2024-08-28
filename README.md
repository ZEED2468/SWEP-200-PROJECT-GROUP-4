WorkFlow of How to contribute to this Project


Step 1: Clone the Repository
Open Terminal or Command Prompt:

Navigate to the directory where you want to clone the repository.
Clone the Repository:

Use the following command to clone the repository:
 git clone https://github.com/ZEED2468/SWEP-200-PROJECT-GROUP-4.git
Replace username with the GitHub username or organization name, and repository-name with the name of the repository.
Navigate into the Repository:

Move into the repository folder:
cd repository-name
Step 2: Create a New Branch
Check Out to a New Branch:
Create and switch to a new branch using the following command:
git checkout -b your-branch-name
Replace your-branch-name with a descriptive name for your branch, such as feature/add-login-page or bugfix/fix-navbar.
Step 3: Make Changes and Commit
Make Your Changes:

Edit, add, or remove files as needed.
Stage the Changes:

Stage the files you want to commit:
git add .
This command stages all changes. You can also stage individual files by specifying their names.
Commit the Changes:

Commit your changes with a meaningful message:
git commit -m "Add login page functionality"
Step 4: Push the Branch to GitHub (Set Upstream)
Push the Branch to GitHub:
Push your branch to the remote repository and set the upstream reference so that you can easily push/pull in the future:
git push --set-upstream origin your-branch-name
Replace your-branch-name with the name of your branch.
Step 5: Compare & Pull Request
Open a Pull Request:

After pushing your branch, go to the repository on GitHub.
You’ll see a prompt to open a pull request for the branch you just pushed.
Click on “Compare & pull request” to start the process.
Fill out the pull request template with relevant details about your changes, including what the changes are, why they were made, and any additional context.
Submit the Pull Request:

Once you’ve filled out the details, click on “Create pull request” to submit it for review.
Step 6: Keep Your Branch Updated
Pull the Latest Changes:

If there are new changes in the main (or master) branch that you need to incorporate into your branch, pull them down and merge them:
git pull origin main
If there are conflicts, resolve them and then commit the merge.
Push the Merged Changes:

After resolving conflicts or merging, push the updated branch back to GitHub:
git push
Final Notes:
Upstream Tracking: By using --set-upstream during the first push, your local branch is linked to the remote branch, simplifying future pushes and pulls with just git push or git pull.
Pull Requests: Ensure you review your pull request before merging and address any requested changes or feedback from reviewers.
This process ensures a smooth workflow for collaborative development, allowing you to maintain code quality and consistency across the team