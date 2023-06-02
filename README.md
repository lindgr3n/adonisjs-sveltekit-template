

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

Also did have some issue with not being able to locate path variables. e.g. `"paths": { "App/*": ["./app/*"],...}` when importing `import User from 'App/Models/User'`. Adding `"baseUrl": ".",` to the compilerOptions in the adonis tsconfig.json file seams to solve it. Looking int this answer https://stackoverflow.com/a/43330003. Not sure why it is needed in this case when it works when creating a adonisjs project from scratch.

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

Next up we need to fix the session handling by installing @adonisjs/session `pnpm --filter backend add @adonisjs/session` and configure it `node ace configure @adonisjs/session`


Got some strange behaviour using pnpm to install svelte/kit. When installing it installs sveltekit version 1.5 (Same happens when running a fresh npm create svelte@latest my-app). The difference is that pnpm honours the version and installs 1.5 while a standalone installation updates the version in the background and installs 1.20. Ended upp manual updating the version for svelte/kit to 1.20 and reinstall. Found the issue here https://github.com/pnpm/pnpm/issues/6463 why pnpm does this.

Making a clean install witout pnpm it still set 1.5 in package json but the svelte/kit version installed is 1.20. Need to dig into this more.
Looks like it depends on the [template](https://github.com/sveltejs/kit/blob/master/packages/create-svelte/templates/default/package.template.json). Need to check this out more. 

Think I found the issue. Inside C:\Development\private\adonis\adonisjs-sveltekit-template\frontend\node_modules\@sveltejs\kit\src\core\sync\write_types\index.js and method tweak_types we get an issue with ts.getModifiers is undefined. That is because ts.version = 4.6.2. Same version that adonis have defined in it's pacakge.json. While SvelteKit is using 5.0

Thinking it's best to run npm install on each package. Otherwise we need somehow manage to keep the correct typescript version somehow...

Currently just running pnpm install then pnpm clean and after step into backend and frontend and running npm i. Test making its own install script.