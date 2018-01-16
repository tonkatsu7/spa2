# SPA Web App Challenge #2

> An Express.js and Vue.js project that uses Mailgun to send an email.

## Local Build Setup

``` bash
# install dependencies
npm install

# edit and copy config for local dev
cp .env_dev .env

# serve with hot reload at localhost:3000
npm start
```

## What's Working

* An Express.js backend serving:
    * A Vue.js single page that uses Bootstrap for styling
    * A POST API method /send/ to receive REST calls from the Vue.js page

## What's Missing

* The program is currently a single server, not a backend + frontend
* The web page does not have validation of user input
* The backend does not have the logic to handle multiple recpipients
* The program is not modular and is not unit test friendly