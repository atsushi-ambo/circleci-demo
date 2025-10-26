import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CircleCI Demo Application</h1>
        <p>
          Successfully deployed using CircleCI and GitHub Pages!
        </p>
        <div className="info-card">
          <h2>Build Information</h2>
          <p>Build Date: {new Date().toLocaleString()}</p>
          <p>Environment: Production</p>
        </div>
        <div className="links">
          <a
            href="https://circleci.com/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CircleCI Documentation
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
