# Covid Checkin

Simple Covid checkin project made for Project Studio UniSA 2021 S5, WebDevPain

## Requirements

You must install the following to develop this app locally

- [NodeJs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [VsCode](https://code.visualstudio.com/download)

Optional Goodies

- Make your terminal pretty [starship](https://starship.rs/)

## Useful links

- [Framer prototyping](https://www.framer.com/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [NextJs](https://nextjs.org/)
- [Vercel](https://vercel.com)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)

## Getting Started

First, install dependencies:

```bash
yarn
```

Install husky hooks

```bash
yarn prepare
```

Now you can run a dev server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction). Can be edited in `pages/api/*.ts`.

## Linting and Styling

> This is now automated with husky

Linting and styling is handled automatically with a command, these commands will run on each PR to main however it is best to run them before any commit

```bash
yarn lint
yarn format
```

## Deployment

All deployments are handled automatically though github commits, branches will have staging urls and main will be pushed to production

You should test that the app builds before pushing with

```bash
yarn build
```

## Git convention

To keep things organized in this repo I ask that all developers use a similar convention when working on features.

1. Use [gitmoji](https://gitmoji.dev/) to begin the commit message
2. Keep messages short and sweet, usually expressing the task you accomplished
3. Create a new commit per task, however avoid making multiple commits for the same task.
4. Aim for 1 commit per feature (branch) this makes it easier to handle multiple branches at once and reduces review time
5. Never push to main, always make a new branch per feature (task)

## Tests

Tests are completed with cypress an e2e tester they are ran automatically with github however when developing tests you can use the following command to test.

```bash
yarn cypress
```
