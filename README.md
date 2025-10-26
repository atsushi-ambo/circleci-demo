# CircleCI Demo Application

A simple React application demonstrating CI/CD pipeline with CircleCI and automated deployment to GitHub Pages.

**Live Demo:** https://atsushi-ambo.github.io/circleci-demo

## Overview

This project demonstrates a complete CI/CD pipeline that automatically:
1. Runs tests on every commit
2. Builds the application
3. Deploys to GitHub Pages (only from main branch)

## How CircleCI Works

### Pipeline Flow

```
Code Push → GitHub → CircleCI Webhook → Pipeline Execution
                                              ↓
                                    ┌─────────────────────┐
                                    │  Job: build-and-test │
                                    ├─────────────────────┤
                                    │ 1. Checkout code    │
                                    │ 2. Restore cache    │
                                    │ 3. Install deps     │
                                    │ 4. Run tests ✓      │
                                    │ 5. Build app        │
                                    │ 6. Save artifacts   │
                                    └─────────────────────┘
                                              ↓
                                    ┌─────────────────────┐
                                    │  Job: deploy        │
                                    ├─────────────────────┤
                                    │ 1. Get build files  │
                                    │ 2. Configure git    │
                                    │ 3. Push to gh-pages │
                                    └─────────────────────┘
                                              ↓
                                      GitHub Pages
                                      (Live Site)
```

### Key Concepts

#### Jobs
- **build-and-test**: Installs dependencies, runs tests, creates production build
- **deploy**: Publishes build artifacts to GitHub Pages

#### Workflow
- Jobs run sequentially (deploy waits for build-and-test)
- Deploy only runs on `main` branch
- If tests fail, deployment is skipped

#### Optimization Features
- **Dependency Caching**: Reuses `node_modules` if `package-lock.json` unchanged (speeds up builds)
- **Workspace Persistence**: Shares `build/` folder between jobs (no need to rebuild)
- **Conditional Deployment**: Feature branches build and test but don't deploy

## CircleCI Setup

### 1. Create GitHub Personal Access Token

GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Name: "CircleCI Deploy"
- Scope: Select `repo`
- Generate and copy the token

### 2. Connect Repository to CircleCI

1. Go to [CircleCI](https://circleci.com/)
2. Click **Projects** → Find your repository
3. Click **Set Up Project**
4. Select **Use Existing Config** (we have `.circleci/config.yml`)
5. Click **Start Building**

### 3. Add Environment Variable

In CircleCI project settings:
- Navigate to **Environment Variables**
- Add variable:
  - Name: `GITHUB_TOKEN`
  - Value: (your GitHub token)

### 4. Configure GitHub Pages

Repository Settings → Pages
- Source: `gh-pages` branch
- Save

That's it! Push any change to `main` branch and watch the pipeline run.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Configuration File Explained

The [.circleci/config.yml](.circleci/config.yml) defines the pipeline:

```yaml
jobs:
  build-and-test:    # First job
    - Install dependencies (npm ci)
    - Run tests
    - Build application
    - Save build artifacts

  deploy:            # Second job
    - Get build artifacts from previous job
    - Deploy to GitHub Pages

workflows:
  build-test-deploy:
    - Run build-and-test
    - Run deploy (only if tests pass, only on main branch)
```

## Project Structure

```
.circleci/config.yml    # CircleCI pipeline configuration
src/                    # React application source code
public/                 # Static assets
package.json            # Dependencies and scripts
package-lock.json       # Locked dependency versions (for reproducible builds)
```

## Testing the Pipeline

1. **Make a change** to any file
2. **Commit and push** to main branch
3. **Watch CircleCI** dashboard for build progress
4. **Check live site** after successful deployment

## Troubleshooting

**Build fails: "npm ci requires package-lock.json"**
- Run `npm install` locally and commit the generated `package-lock.json`

**Deploy fails: "Repository not found"**
- Verify `GITHUB_TOKEN` is set in CircleCI environment variables
- Check token has `repo` scope

**Tests fail**
- Run `npm test` locally to debug
- Fix issues and push again

## Resources

- [CircleCI Documentation](https://circleci.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [This project's live site](https://atsushi-ambo.github.io/circleci-demo)
