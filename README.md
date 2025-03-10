#  Loan Management Application

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL

## Installation and run

1. **Clone the repository:**
```bash
   git clone https://github.com/talantbekov123/next-app
   cd next-app
   ```
2. **Set Up Environment Variables**
```
Create a .env file and assign a value to the DATABASE_URL variable.
```
3. **Install dependencies, run Prisma commands, build, and start the project:**
```
npm install
npx prisma generate
npx prisma db pull
npm run build
npm run start
```

# Available Scripts

These scripts are defined in the `package.json` and help manage the project.

## `dev`
- **Command:** `next dev`
- **Description:** Starts the development server with hot reloading.

## `test`
- **Command:** `npx jest`
- **Description:** Executes all tests inside the project

## `build`
- **Command:** `next build`
- **Description:** Builds the application for production.

## `start`
- **Command:** `next start`
- **Description:** Runs the production build.

## `lint`
- **Command:** `eslint src --ext .js,.jsx,.ts,.tsx`
- **Description:** Checks the code in the `src` folder for lint issues.

## `lint:fix`
- **Command:** `eslint src --ext .js,.jsx,.ts,.tsx --fix`
- **Description:** Automatically fixes lint issues.
