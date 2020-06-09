# TypeScript Electron React Boilerplate

Basic boilerplate with all the core components you need to start off your fancy Electron app.


## Features:
- typing, formatting, linting, import sorting (see https://github.com/danitt/ts-boilerplate for more info)
- hot reloading
- npm scripts for serving, building & packaging app


## Generating Icons
1. Create Icon Set
  https://github.com/onmyway133/IconGenerator

2. Bundle into .icns file
  ```$ iconutil -c icns "AppIcon.iconset"```

3. Copy to /assets/AppIcon.icns

Note: known issue with electron showing default app icon.
Go to node_modules -> electron -> dist, right click on Electron, select Get Info (Mac only)
Drag another icon into the electron icon on the top left
