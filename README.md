This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn lint`

Checking for error script rules based on rules on `.eslintrc` files (recommended to running this command frequently every changing codes)<br />
See more about eslintt [running tests](https://eslint.org/) for more information.

### `yarn lint:fix`

Self fix (auto fix) error code and rewrite the code based on eslint rules.
notes: not all errors and warning can be fixed automatically with this command so preferly to frequently check the console and fixes the errros

### `yarn format`

Format code tobe exact with the eslint rules using `prettier-eslint` (https://github.com/prettier/prettier-eslint)
This command is actually running `eslint --fix` then running `prettier --write` since prettier and eslint sometimes has conflicted rules

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### GIT HOOKS

this project is using [husky](https://github.com/typicode/husky#readme) for hooking the git command. in this case we using pre-commit for lint using [lint-staged](https://github.com/okonet/lint-staged) and format the codes using [prettier](https://prettier.io/), so we make sure the codes is pretty formatted before we push the codes to the cloud

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
