# Drink Counter 2.0

Live (mobile preferred): https://konni.munax.club/

Backend: https://github.com/OtsoHellman/drink-counter-back

<img src=https://i.imgur.com/n8y8mVW.jpg width="35%"> <img align="top" src=https://i.imgur.com/RtwC6GN.jpg width="35%">

## Description

Drink counter is a mobile-first full-stack web application that can compute & visualize the “konni” (BAC that has been scaled with a constant value) of multiple people based on reported number of drinks.

### Key features:

-	Approximates & updates konni of everyone in real time (instant updates to every connected device with websockets) based on following formula: https://en.wikipedia.org/wiki/Blood_alcohol_content#Estimated_blood_alcohol_content_by_intake
-	Dynamically updated graphs that visualize the level of konni (react-vis)
-	Users can be created:
    -	Remembers your favorite drinks (saved in MongoDB database)
    -	Easy access with “my page” (implemented with cookies, no authentication so that single user can log drinks for multiple people, not only their own)
-	Custom drinks can be added that vary in size and alcohol content

## How to use

1. Open the page and tap on "users"
2. Select your user or press the "+" icon to add a new user
<img src=https://i.imgur.com/1fyna91.jpg width="30%">


3. Add your name, weight, and gender (weight and gender are required for the formula to work), tap "send"
4. Go back to the user page, and select your user

<img src=https://i.imgur.com/XDcehnB.jpg width="30%">

5. Tap "set as my user" to link "my page" tab to your user
6. Tap on drink name (or add your own) to start the visualization!

<img src=https://i.imgur.com/gQs4Jj6.jpg width="30%">

----------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
