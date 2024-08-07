
# Building a Monorepo with React Native, React, and Node.js: A Small Project Todo List

### Requirements

```
node v16.20.2^
npx react-native doctor
```

### Installation
```
yarn
yarn web-nodeModules
yarn mobile-nodeModules
yarn shared-nodeModules
yarn shared-build
```

### Uninstall
```
rm -rf node_modules
rm -rf packages/backend/node_modules
rm -rf packages/mobile/node_modules
rm -rf packages/shared/node_modules
rm -rf packages/web/node_modules
```

### Add Packages
If you need to add a development dependency, use the -D flag:
```
yarn workspace <workspace-name> add -D <package-name>
```
To remove a package, use the remove command:
```
yarn workspace <workspace-name> remove <package-name>
```
Example:
```
yarn workspace shared add lodash
```

### Run the app
```
yarn web-start
yarn backend-start
yarn mobile-start
```

### Screenshots
![app example](<app example.png>)