# User authentication and Onboarding

### Tech Stack

1. React JS and React hooks
2. Node JS and Express
3. Jest for testing
4. Mongodb

### Approach

The front end is developed on React js using multiple stateless and statefull components. There are two working urls in the client app that are responsible for the onboarding or login process. The client app makes connection to the server securely by making use of AES algorithm that should prevent man in the middle attack. This is a standard follwed through all the requests initiated by this client so that no data is easily accessible to an attacker without the secret key.

A collection is maintained in the Mongodb to store all user data along with passwords. The passwords are stored as a hash value instead of clear text to prevent any data leaks in the future.
The schema for the collection can be found in the following directory

```
server
    |_src
        |_db-init
            |_models
                |_user.js
```

Before informing the user that the server is live a connection request to the mongo db is tried to check if the db is not down.
Each API call is divided into layers routes,controllers,repositories.
Where routes are responsible for accepting request and sending responses, controllers will take care of the processing and repositories deal with database related operations. Each layer has its own error handling process along with a common error handler attached to the root.
The decryption is handled automatically by the root of the server so that all the routes require to have a particular request body.

On the client app all the inputs have a regex assigned which takes care of user input and any brute force attack that might occur.

In case of any input error the user can see a toast message on the top right of the screen and there are not server requests made if there are errors on the user input. As a thumb rule the email id is kept as a unique field and no duplicates are saved. So one user cannot signup twice and only registered users can login to the system or they are shown error of "Invalid Credentials".
This generic error is shown to prevent brute force attacks.

After successfull login / signup a token is generate using JWT that expires after 7 minutes and is send to the client. Post recieving the token it is set in the local storage of the client (browser) for future use and the user is redirected to a success screen.

### Testing

The exposed endpoints are tested to check for positive and negative process.
Following are the cases that are covered

1. Successfull sign up and login using on set of user details.
2. Malformed requests for both sign up and login.
3. Invalid credentials for log in.

All test data is deleted after the test process ends.

### Snap shots of UI

![alt text](https://github.com/RohanShah27/Login-Signup/blob/develop/client/src/assets/images/signup.PNG?raw=true)

![alt text](https://github.com/RohanShah27/Login-Signup/blob/develop/client/src/assets/images/login.PNG?raw=true)

### FAQ

Data items like API Endpoint, Secret key, Number of hashing rounds are to be kept as environment variables so that they arent viewable and cannot be changed. Not made use of the same process as this is just a demo application.

## Author

[Rohan Shah](https://github.com/RohanShah27)
