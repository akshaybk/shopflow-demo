# Shopflow

Shopflow is a mobile-first shop management prototype for client demonstrations. It uses realistic Indian retail data, INR formatting, local demo state, interactive transaction workflows, role-based dashboards, inventory controls, reports, and notifications.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Publish on GitHub Pages

1. Create a new GitHub repository for this project.
2. Push the `main` branch to that repository.
3. In GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will build and deploy the site after each push to `main`.

The showcase URL will be:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

The demo login is available from the profile menu. No password is required.
