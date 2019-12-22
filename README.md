# colourFill Web App

[Open it here.](https://colourfill.firebaseapp.com/)

This web application allows the users to colour pictures using a palette of colours. These pictures can either be requested from the Bing Search Api or taken with the camera.

The pictures taken with the camera go through an edge detection algorithm to make them black and white. The black and white images are then loaded onto a canvas where for each colouring event, there is a flood-fill code that runs to identify the shape of the image that needs to be coloured.

The application allows users to create accounts, and save all their pictures, coloured or not.
Each colouring event is saved into each picture, so the user can always go back to previous states.


## Log In
Start by signing up for an account and then login.

<img src="https://anapgsilva.github.io/colourFill/src/images/signin.png" width="500">

## Homepage
User lands on their homepage where pictures can be searched and current pictures are displayed.

<img src="https://anapgsilva.github.io/colourFill/src/images/home.png" width="500">

## Search for pictures
Pictures can be searched by key words. This will search the Bing Image Search Api for black and white pictures of the query.

<img src="https://anapgsilva.github.io/colourFill/src/images/searchbar.png" width="500">

## Take pictures with the camera
Another option is to take pictures using the camera. Once picture is taken, the final black and white picture is shown. If the user is happy about it, this can be used for colouring, otherwise user can take another camera picture.

<img src="https://anapgsilva.github.io/colourFill/src/images/camerapage.png" width="500">

## Picture colouring
Selected pictures are then loaded onto a canvas where the user can select a colour and click onto the shape that wants to be coloured. User has the choice to revert the colouring events.

<img src="https://anapgsilva.github.io/colourFill/src/images/beforecolour.png" width="500">
<img src="https://anapgsilva.github.io/colourFill/src/images/aftercolour.png" width="500">


This application was built using React and Firebase was used for hosting, back server, real-time database and functions.

Functions Firebase server was used to overcome the CORS problem of manipulating an image that was coming from the Bing website.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
### `npm install react-bootstrap bootstrap`

User icon was adapted from the fonts awesome website (https://fontawesome.com/).
### `npm i --save @fortawesome/fontawesome-svg-core  @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome`
>
### `npm i --save @fortawesome/free-brands-svg-icons`



## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


### `firebase deploy --only hosting:colourfill`

Deploys the application to Firebase.
