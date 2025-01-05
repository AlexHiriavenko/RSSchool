# news-JS

#### Run application:

-   use Node.js version 20.11.1
-   Rename `.env.example` to `.env` and set variables with your data
-   Run command in your terminal `npm i`
-   Run command in your terminal `npm start`

##### Notes:

-   if you encounter the error "Delete `␍` prettier/prettier" - run the following command in cl "npm run lint:fix"
-   if you encounter "apiKeyExhausted" error or 406/426 error, try changing the api_key to something else in the .env file (select an alternative key)
-   in Deploy Case if you encounter with error 429 try changing the URL to something else in the .env file (select an alternative URL)
-   if you encounter an error "HookWebpackError: The requested module 'node:stream' does not provide an export named 'getDefaultHighWaterMark'" during the process "npm run build" /
    "npm start" use Node.js version 20.11.1. In version v18.14.0 the 'copy-webpack-plugin' dependency does not work correctly
