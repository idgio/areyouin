# Are you in..?

Simple web app that uses reactJS and firebase databse as a service, this simple webapp allows groups to coordinate when ordering food over the work.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`


### Installing

Before runing any scrpit create a Config folder inside src, over Config create a file named config.js with your following firebase credentials


```
export const DB_CONFIG  = {
     apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    databaseURL: "https://xxxxxxxxxxxxxx.xxxx",
    projectId: "xxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxx"
};

```


## Built With

* [React](https://reactjs.org/) - The js UI library
* [Material-UI](https://material-ui-next.com) - Components like app bar and modals
* [Firebase Real time Database](https://firebase.google.com/products/database/) - Dabatase as a service
* [AWS cloud 9](https://aws.amazon.com/es/cloud9/) - Cloud IDE


## Authors

* **Giovanni Rodriguez** - *Initial work* - [idgio](https://github.com/idgio)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


