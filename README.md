# CircleCI Demo Application

A simple React application demonstrating CI/CD with CircleCI and GitHub Pages deployment.

## Prerequisites

- Node.js 18+ installed
- GitHub account
- CircleCI account (connected to GitHub)

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Run the application locally:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

4. Build for production:
```bash
npm run build
```

## CircleCI Setup Instructions

### Step 1: Update package.json

Update the `homepage` field in [package.json](package.json) with your GitHub username:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/circleci-demo"
```

### Step 2: Push to GitHub

```bash
# If you haven't already initialized git
git init
git add .
git commit -m "Initial commit: Add CircleCI demo app"

# Create a new repository on GitHub (named 'circleci-demo')
# Then push your code
git remote add origin https://github.com/YOUR_USERNAME/circleci-demo.git
git branch -M main
git push -u origin main
```

### Step 3: Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "CircleCI Deploy"
4. Select the `repo` scope (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't be able to see it again!)

### Step 4: Set Up Project in CircleCI

1. Go to [CircleCI](https://circleci.com/)
2. Click "Projects" in the left sidebar
3. Find your `circleci-demo` repository
4. Click "Set Up Project"
5. Select "Use Existing Config" (since we already have `.circleci/config.yml`)
6. Click "Start Building"

### Step 5: Add Environment Variables in CircleCI

1. In CircleCI, go to your project settings (click the gear icon)
2. Navigate to "Environment Variables" in the left menu
3. Click "Add Environment Variable"
4. Add the following:
   - **Name**: `GITHUB_TOKEN`
   - **Value**: (paste the personal access token you created)
5. Click "Add Environment Variable"

### Step 6: Trigger a Build

Push a change to the main branch, or click "Rerun workflow from start" in CircleCI to trigger a deployment.

```bash
# Make a small change
echo "# CircleCI Demo" > test.txt
git add test.txt
git commit -m "Test CircleCI deployment"
git push
```

### Step 7: Configure GitHub Pages (if needed)

1. Go to your GitHub repository settings
2. Navigate to "Pages" in the left menu
3. Under "Source", select the `gh-pages` branch
4. Click "Save"

Your site will be available at: `https://YOUR_USERNAME.github.io/circleci-demo`

## CircleCI Configuration Overview

The [.circleci/config.yml](.circleci/config.yml) file defines two jobs:

### 1. build-and-test
- Checks out code
- Installs dependencies with caching
- Runs tests
- Builds the application
- Saves build artifacts
- Persists workspace for the deploy job

### 2. deploy
- Runs only on the main branch
- Attaches workspace from build job
- Configures git credentials
- Deploys to GitHub Pages using the gh-pages package

### Workflow
The workflow runs both jobs sequentially:
1. `build-and-test` runs first
2. `deploy` runs only if build-and-test succeeds and only on the main branch

## Key Features Demonstrated

1. **Dependency Caching**: Speeds up builds by caching node_modules
2. **Testing**: Runs Jest tests with coverage
3. **Build Artifacts**: Stores build output for inspection
4. **Workspace Persistence**: Shares files between jobs
5. **Conditional Deployment**: Only deploys from the main branch
6. **GitHub Pages Integration**: Automated deployment to GitHub Pages

## Testing the CI/CD Pipeline

Try these scenarios to test your pipeline:

1. **Successful Build**: Make a small change and push to main
2. **Failed Tests**: Break a test to see the pipeline fail
3. **Branch Protection**: Push to a feature branch (won't deploy)

## Troubleshooting

### Build Fails: "npm ci requires a package-lock.json"
Solution: Run `npm install` locally and commit package-lock.json

### Deploy Fails: Authentication Error
Solution: Check that GITHUB_TOKEN is set correctly in CircleCI environment variables

### GitHub Pages Not Updating
Solution: Check repository Settings → Pages → ensure gh-pages branch is selected

### Tests Hanging
Solution: Ensure tests run with `--watchAll=false` flag

## Project Structure

```
circleci-demo/
├── .circleci/
│   └── config.yml          # CircleCI configuration
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Component styles
│   ├── App.test.js         # Component tests
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   └── setupTests.js       # Test configuration
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## Interview Preparation Tips

When discussing this project in your interview, highlight:

1. **CI/CD Understanding**: Explain the build → test → deploy pipeline
2. **CircleCI Concepts**:
   - Jobs and workflows
   - Caching strategies
   - Workspace persistence
   - Environment variables
3. **Best Practices**:
   - Running tests before deployment
   - Branch-based deployment strategies
   - Using artifacts for debugging
4. **GitHub Integration**: Token authentication and Pages deployment

## Additional Resources

- [CircleCI Documentation](https://circleci.com/docs/)
- [CircleCI Configuration Reference](https://circleci.com/docs/configuration-reference/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Documentation](https://react.dev/)

## License

MIT
