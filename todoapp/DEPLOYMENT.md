# Deployment Guide - Todo List App

## Live Application

🌐 **Production URL:** https://wonderlink.github.io/epay/todoapp

## Deployment Options

### Option 1: GitHub Pages (Recommended)

The app is automatically deployed to GitHub Pages on every push to the `main` branch.

#### Manual Deployment:
```bash
cd todoapp
npm run deploy
```

#### Automatic Deployment:
The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Installs dependencies
2. Builds the production bundle
3. Deploys to GitHub Pages

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd todoapp
vercel
```

**Expected URL:** `https://todoapp-wonderlink.vercel.app`

### Option 3: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd todoapp
netlify deploy --prod --dir=build
```

**Expected URL:** `https://todoapp-wonderlink.netlify.app`

### Option 4: Docker Deployment

Create a `Dockerfile` in the todoapp directory:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Then:
```bash
docker build -t todoapp .
docker run -p 80:80 todoapp
```

## Environment Variables

Copy `.env` and configure:

```env
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
REACT_APP_NAME=Todo List App
```

## Pre-deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] LocalStorage working correctly
- [ ] All features tested
- [ ] Performance optimized
- [ ] Mobile responsive

## Post-deployment Verification

1. Visit the live URL
2. Create a test task
3. Refresh the page (verify persistence)
4. Check browser console for errors
5. Test all features:
   - Create tasks
   - Edit tasks
   - Delete tasks
   - Mark as complete
   - Filter tasks
   - Search tasks
   - Category filtering

## Troubleshooting

### Build Fails
```bash
cd todoapp
rm -rf node_modules package-lock.json
npm install
npm run build
```

### White Screen After Deployment
- Check browser console for errors
- Verify `homepage` in package.json
- Clear browser cache
- Check GitHub Pages settings

### LocalStorage Not Working
- Ensure not in private/incognito mode
- Check browser storage settings
- Verify no third-party script blocks

## Performance Optimization

```bash
# Analyze bundle size
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'
```

## Monitoring

- Set up error tracking (Sentry)
- Monitor performance (Google Analytics)
- Track user behavior
- Monitor uptime

## Version Control

Tag releases:
```bash
git tag -a v1.0.0 -m "Initial Release"
git push origin v1.0.0
```

## Support

For issues, create a GitHub Issue in the repository.
