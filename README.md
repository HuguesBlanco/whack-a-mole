# Whack a mole

A simple game where you hit the moles as they pop up from their holes.

## Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en) version 20+

## Getting Started

Clone the project

```
git clone https://github.com/HuguesBlanco/whack-a-mole.git
```

Navigate to the app folder.

```
cd whack-a-mole
```

Install dependencies.

```
npm install
```

Run the `dev` script to start the development server.

```
npm run dev
```

The development server will be available at http://localhost:5173.

## Recommended VS Code Plugins

If you're using [Visual Studio Code](https://code.visualstudio.com), the following plugins can greatly enhance your development experience.

- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**  
  Integrates ESLint into VS Code, displaying errors and warnings directly in the editor without the need to run ESLint manually.
- **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**  
  Automatically formats your code on save. To ensure that Prettier formats your code each time you save a file, you need to add the following lines to your [settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson) file:
  ```json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
  ```
  These settings enable automatic formatting on save and set Prettier as the default formatter.
- **[VS Code ES7+ React/Redux/React-Native/JS snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)**  
  Adds shorthand prefixes and code snippets to autocompletion suggestions, accelerating and facilitating development.
- **[GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)**  
  Enhances Git capabilities in VS Code by providing a variety of tools, such as displaying historical context about line changes in the editor and showing a stash view in your source control tab.
- **[Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)**
  Integrates Vitest into VS Code, providing a graphical interface to run and debug tests directly in the editor.

## VS Code Settings

Add the following configuration to your [settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson) file in [Visual Studio Code](https://code.visualstudio.com):

```json
"editor.codeActionsOnSave": {
  "source.organizeImports": true
}
```

This setting automatically organizes your imports every time you save a file. This ensures that imports are always sorted consistently, preventing unnecessary changes in import order during merge requests and improving code readability.

## Available Scripts

In the project directory, you can run the following scripts:

| Script               | Description                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`        | Starts the development server. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The development server integrates Hot Module Replacement (HMR), which automatically reloads the application when you make changes to the code. |
| `npm run typescript` | Runs the TypeScript compiler in watch mode. It will continuously check your code for type errors and other issues as you make changes.                                                                                                                        |
| `npm run lint`       | Runs ESLint and displays potential code problems. This helps maintain code quality and consistency.                                                                                                                                                           |
| `npm run test`       | Runs all unit tests using Vitest.                                                                                                                                                                                                                             |
| `npm run build`      | Builds the application for production. This script compiles the TypeScript code and bundles the application with Vite. The output will be in the `dist` folder.                                                                                               |
| `npm run preview`    | Serves the production build locally. This is useful for testing the production build before deploying. **Note**: You must run `npm run build` beforehand.                                                                                                     |
