# User Data Table (React + Vite)

Add, edit, delete, search and filter users by role. Data is saved in the browser's localStorage.

## Run locally
    npm install
    npm run dev

## Deploy to GitHub Pages
1. Create a GitHub repository and push this project to the `main` branch.
2. On GitHub: Settings -> Pages -> Source -> choose "GitHub Actions".
3. The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.
4. Your site will be at https://USERNAME.github.io/REPO-NAME/

## Structure
- src/App.jsx        - state, search, search, role filter state, add/update/delete logic
- src/UserModal.jsx  - pop-up form used to add and edit a user
- src/RoleSelect.jsx - single dropdown button for the role filter
- src/UserTable.jsx  - table of users with Edit and Delete buttons
- vite.config.js     - Vite config (relative base path for GitHub Pages)
- .github/workflows/deploy.yml - GitHub Actions deploy workflow
