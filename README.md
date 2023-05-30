

`pnpm install`


## Commands

Run command in all packages
`pnpm run [COMMAND]`

Run specific command in subpackage
`pnpm --filter [PACKAGE] [COMMAND]`

Start dev in all package
`pnpm run dev`

Build all packages
`pnpm run build`


## Project setup

This is walkthrough how this packages got created from scratch.
First we create a basic npm package `npm init` `git init`. 
Next we create configuration fiel for our pnpm workspace.

```
packages:
  # shared packages between frontend and backend
  - 'packages/*'
  # adonis
  - 'backend'
  # Sveltekit
  - 'frontend'

```

Create a new SvelteKit in frontend `npm create svelte@latest frontend`
Create a new Adonisjs in backend. `npm init adonis-ts-app@latest backend` making it a web project
Because adonis run npm install in creation we remove node_modules and package-lock.json and use pnpm install.

Need to figure this bit out. How to optimize pnpm package management. Thinking one should be able to install e.g eslint in root and just point it out in each subpackage. So we use the same eslint package in each sub not sure how that works.

Had some issue with typescript not being able to load tsconfig.json inside adonis when e.g. looking inside route.ts. 
Added the .vscode/settings file seems to solve that issue. (https://github.com/microsoft/vscode-eslint/issues/1170#issuecomment-775282384).

When we are using subdirectories it is needed to configure the workingDirectories according to https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint#settings-options.

```
{
  "eslint.workingDirectories": ["./backend", "./frontend", "./packages"]
}
```


Next we configure the authentication for adonis. First we need to setup lucid by following the [guide](https://docs.adonisjs.com/guides/database/introduction) In short `pnpm --filter backend add @adonisjs/lucid` then step into the backend folder and run `node ace configure @adonisjs/lucid` to configure lucid. Update env.ts with correct config. Im using a MySQL database.

```
MYSQL_HOST: Env.schema.string({ format: 'host' }),
MYSQL_PORT: Env.schema.number(),
MYSQL_USER: Env.schema.string(),
MYSQL_PASSWORD: Env.schema.string.optional(),
MYSQL_DB_NAME: Env.schema.string(),
```

After lucid is installed we continue with https://docs.adonisjs.com/guides/auth/introduction. Install `pnpm --filter backend add @adonisjs/auth`. Next run `node ace configure @adonisjs/auth`. Using User model and create migrations.

Run the migration `node ace migration:run`
