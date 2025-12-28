# Development Scripts & Commands

## Available Scripts

### Development

```bash
yarn dev          # Start development server with HMR
yarn build        # Build for production
yarn preview      # Preview production build locally
```

### Code Quality

```bash
yarn lint         # Run ESLint (if configured)
yarn format       # Format code with Prettier (if configured)
yarn type-check   # TypeScript type checking
```

### Testing (Future)

```bash
yarn test         # Run all tests
yarn test:watch   # Run tests in watch mode
yarn test:coverage # Generate coverage report
```

## Useful Commands

### Clean Install

```bash
rm -rf node_modules yarn.lock
yarn install
```

### Build Analysis

```bash
yarn build --mode production
# Check dist/ folder size
du -sh dist/
```

### Find Large Dependencies

```bash
npx vite-bundle-visualizer
```

### Update Dependencies

```bash
yarn upgrade-interactive --latest
```

## Development Tips

### Fast Refresh

- HMR (Hot Module Replacement) is enabled by default
- Changes to `.tsx` files trigger instant updates
- CSS changes are injected without page reload

### Debugging

```typescript
// Use browser DevTools
console.log("Debug:", variable);

// TypeScript errors
// Check terminal output for compile errors
// Check browser console for runtime errors
```

### Performance

```bash
# Build and check bundle size
yarn build
ls -lh dist/assets/

# Analyze bundle composition
npx vite-bundle-visualizer
```

### Port Issues

If port 5173 is already in use:

```bash
# Vite will automatically try next available port
# Or manually specify:
vite --port 3000
```

## Environment Setup

### First Time Setup

```bash
# 1. Clone repository
git clone <repo-url>
cd fme-clone

# 2. Install dependencies
yarn install

# 3. Create environment file
cp .env.example .env

# 4. Start development
yarn dev
```

### IDE Configuration

#### VS Code

Recommended extensions:

- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense

#### Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build command: yarn build
# Publish directory: dist
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
CMD ["yarn", "preview", "--host"]
```

## Troubleshooting

### Issue: Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules .vite
yarn install
```

### Issue: TypeScript errors

```bash
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### Issue: Port already in use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue: Out of memory

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
yarn dev
```
