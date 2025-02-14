# Movie Gallery

A React \& TypeScript-based movie gallery for browsing and managing movie details.

## Features

- Responsive & Paginated Results for Movie Search.
- Movie search functionality with debounced input
- Detailed view for individual movies
- Add/Remove movies to/from favorites

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn package manager

### Installation

1. Clone the repository.
2. Run `yarn install` to install dependencies.

### Configuration

- Add a `tsconfig.json` file with your custom configuration or with the following contents :

```
{
  "compilerOptions": {
    "jsx": "react",
    "target": "es2016",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "types": ["styled-components", "jest", "@testing-library/jest-dom"]
  }
}
```

- Add a `eslint.config.mjs` file with your custom configuration or with the following contents :

```
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

```

### Available Scripts

- `yarn start`: Runs the app in development mode.
- `yarn build`: Builds the app for production.
- `yarn test`: Runs the test suite.
- `yarn eslint`: Lints the source files.
- `yarn prettier`: Formats the code.

## Usage

After starting the development server, you can:

- Browse the curated movie gallery on the home page.
- Use the search bar to find specific movies.
- Click on a movie card to view its details.
- Add or remove movies from your favorites list.
- Navigate between pages using pagination controls.

---

**Date:** Friday, February 14, 2025, 10:03 AM CET

<div style="text-align: center">⁂</div>

[^1]: https://pplx-res.cloudinary.com/image/upload/v1739510492/user_uploads/YBpGLeLoniadBCP/image.jpg
