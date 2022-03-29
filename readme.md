# Project static by FEVER

Info about frontend project static

## Installation and Setup

- Download Node.js from your favorite browser [here](https://nodejs.org/en/download/)
- Restart your PC (just in case)
- Clone this [project](https://dev.azure.com/feverit/FeverIT/_git/Web-Starter-Kit-Gulp-Pug-Scss-Modern) (see how to clone in Azure DevOps [here](https://docs.microsoft.com/en-us/azure/devops/repos/git/clone?view=azure-devops&tabs=visual-studio))
- Open the Project with your favorite IDE
- Run the integrated Terminal (or the external one)
- In the Terminal run the following commands:
  - `npm i -g npm gulp gulp-cli` (only once - after the first time you install node)
  - `npm i` (to install `node_modules`. only once everytime you clone a static project)
  - `gulp build` (to compile and run the distributable files. everytime you need to run the static project first time)
  - `gulp` (to rum localhost server and watch file changes) or `gulp api` (same as `gulp` with express.js API)

- Open the browser in localhost, usually [localhost:9000](http://localhost:9000), in doubt look at the Terminal and you will see something like this:

![localhost URL](https://i.imgur.com/HNP37UU.png)

You can hit `ctrl + click` on the local link to open the project in the browser.

Et voilá!

---

## How to debug Gulp

- Open the Terminal and run the following command `node --inspect-brk ./node_modules/gulp/bin/gulp.js --verbose`

- Open Google Chrome and type the following url `chrome://inspect/#devices`

- Click on the link "**Open dedicated DevTools for Node**"

---

## Notes

- Whenever you find this error (or similar - related to `node-sass`)

  > Error: ENOENT: no such file or directory, scandir '**/node_modules/node-sass/vendor'

  Do this:

  - Delete `node-modules` folder
  - Run `npm i`
  - Run `node node_modules/node-sass/scripts/install.js`

  And now you can run `gulp`