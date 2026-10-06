# Git & GitHub Test Cheat Sheet

## Test submission requirements

Your submission must be a **single clonable Git repository**.

The marker must be able to run:

```bash
git clone <repo-url>
```

without needing:

- an SSH key
- a Personal Access Token (PAT)
- a login

The safest setup is therefore:

- **Public GitHub repository**
- **HTTPS clone URL**
- A working `README.md`
- Clear run instructions
- Frequent commits and pushes
- A final clean-clone test before the deadline

The version marked will be the **last commit pushed before 17:00**.

---

# 1. GitHub repository settings

Use the following settings when creating the repository:

| Setting | Recommended value |
|---|---|
| Repository visibility | **Public** |
| Clone method | **HTTPS** |
| README | Required in final submission |
| `.gitignore` | Use the appropriate template, e.g. Node |
| License | Not required |
| Branch protection | Off |
| Require pull requests | Off |
| Require status checks | Off |
| Git LFS | Avoid unless absolutely necessary |
| Submodules | Avoid unless absolutely necessary |

Your submitted repository URL should look like:

```text
https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

Do **not** submit an SSH URL such as:

```text
git@github.com:YOUR-USERNAME/YOUR-REPO.git
```

---

# 2. Configure Git on the lab machine

Check that Git is installed:

```bash
git --version
```

Configure your identity if needed:

```bash
git config --global user.name "Your Name"
git config --global user.email "YOUR_GITHUB_EMAIL"
```

Check the configuration:

```bash
git config --global user.name
git config --global user.email
```

---

# 3. Starting a new repository

If you created the GitHub repository first and are starting locally:

```bash
git init
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

Check the remote:

```bash
git remote -v
```

Make the first commit:

```bash
git add .
git commit -m "Initial project setup"
git push -u origin main
```

After that, normal pushes are:

```bash
git push
```

---

# 4. Normal workflow during the test

Check what has changed:

```bash
git status
```

See unstaged changes:

```bash
git diff
```

Stage everything:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe what changed"
```

Push:

```bash
git push
```

The normal cycle is:

```bash
git status
git add .
git commit -m "Describe what changed"
git push
```

Commit and push after every meaningful working milestone.

---

# 5. AI-assisted commits

For this assessment, only **Qoder** may be used as an AI tool.

If Qoder generated code included in a commit, add an `Assisted-by:` line to the commit message.

Example:

```bash
git add .
git commit -m "Implement task creation form

Assisted-by: Qoder[ACTUAL-MODEL-NAME]"
git push
```

Replace `ACTUAL-MODEL-NAME` with the model actually shown by Qoder.

If no AI-generated code was used for a particular commit, a normal commit is sufficient:

```bash
git commit -m "Fix button spacing"
```

Do not claim AI non-usage if AI-generated code is part of the commit.

---

# 6. README AI declaration

If Qoder is used for code generation, include an AI usage section in `README.md`.

Example:

```markdown
## AI Usage

This repository makes use of AI code generation using the following tools:

- Qoder[ACTUAL-MODEL-NAME]

This repository does not use any other AI code-generation tools during this assessment.

This repository does not use AI in-line editing tools other than functionality used through Qoder.

This repository does not use AI code review other than functionality used through Qoder.
```

Adjust the wording so it accurately describes what you actually used.

---

# 7. README run instructions

Your repository must explain exactly how to run the submission.

Example:

````markdown
# Test Submission

## Requirements

- Node.js
- npm

## Installation

```bash
npm install
```

## Running the application

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Testing

```bash
npm test
```

## AI Usage

This repository makes use of AI code generation using the following tools:

- Qoder[ACTUAL-MODEL-NAME]

This repository does not use any other AI code-generation tools during this assessment.
````

Change the commands, dependencies and port to match the actual project.

---

# 8. Useful Git commands

## Check repository status

```bash
git status
```

## See unstaged changes

```bash
git diff
```

## See staged changes

```bash
git diff --staged
```

## See recent commits

```bash
git log --oneline
```

Or only the most recent commits:

```bash
git log --oneline -10
```

## See configured remote

```bash
git remote -v
```

## Fix the remote URL

```bash
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

## See current branch

```bash
git branch
```

## Unstage a file without deleting its changes

```bash
git restore --staged filename
```

## Throw away uncommitted changes to a file

```bash
git restore filename
```

**Warning:** this deletes your uncommitted changes to that file.

---

# 9. If the remote branch is ahead

Try:

```bash
git pull --rebase
git push
```

Avoid casually using:

```bash
git push --force
```

during the assessment.

---

# 10. `.gitignore`

For a typical Node/Next.js project:

```gitignore
node_modules/
.next/
dist/
coverage/
.env
.env.local
```

Do not commit secrets.

If the project requires environment variables, include an example file such as:

```text
.env.example
```

Example:

```env
DATABASE_URL=example
API_KEY=example
```

Explain required configuration in the README.

Prefer a submission that runs with as little external configuration as possible.

---

# 11. Final clean-clone test

Before the deadline, test the repository exactly as a marker would.

From a directory outside your working project:

```bash
cd /tmp
rm -rf submission-test

git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git submission-test

cd submission-test
```

Then follow your own README exactly.

For example:

```bash
npm install
npm run dev
```

Confirm that:

1. The repository clones without authentication.
2. `README.md` exists.
3. Dependencies install successfully.
4. The application starts.
5. Important functionality works.
6. The AI declaration is present and accurate.
7. Your latest intended commit is visible on GitHub.

---

# 12. Final checks before 17:00

Run:

```bash
git status
```

Ideally you should see:

```text
nothing to commit, working tree clean
```

Then:

```bash
git log --oneline -5
git remote -v
git push
```

Open GitHub in the browser and confirm that the latest commit is present.

Do not leave the final push until 16:59.

---

# Commands to memorise

If you remember nothing else:

```bash
git status
git diff
git add .
git commit -m "What I changed"
git push
git log --oneline
```

And before submission:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

## Final rule

**Public + HTTPS + README + working clean clone + correct AI attribution + pushed before 17:00.**
