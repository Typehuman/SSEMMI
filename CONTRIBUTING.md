# Contributing to the project
Hi there, thanks for your interest in contributing to our mission!

## Contributing data
This project is not designed as an interface for a user to directly add their data to
the data store. Data is added through our partners (add partner data here).


For websites that wish to contribute to, or benefit from, our open access data - follow the steps below;

### Sign up to SSEMMI Project
1. Go to the [SSEEMMI Project website](https://sssemmi-api.typehuman.dev) and click on register
2. Fill out the registration form and click 'Sign up'
3. An administrator will review your request and notify you when your account is process


### Integrate SSEMMI with your website
These steps can be undertaken once your account has been approved.
1. Go to the [SSEEMMI Project website](https://sssemmi-api.typehuman.dev) and click on Login
2. Enter your email and password and click 'login'
3. You will see two sections; **Contributor Profile** and **Your Active Tokens**. You can add your information to 
Contributor Profile now, or alternatively update it later.
>Contributor profile stores information that is added to records that you add to the open data.

>Your Active Tokens shows your API tokens. Your first token, titled **Default**, is created for you. 
If you wish to create another token, click **Create Token** and enter a name for the new token.
4. Copy your token - avoid storing it directly in your code. Add it as a Bearer token when making requests to the 
[Sightings Api](DOCS.md#markdown-header-sightings).
```
# For example:
import axios from 'axios'

const requestAuth = {
        headers: {
          'Authorization': 'Bearer ' + <YOUR TOKEN>,
          'Content-Type': 'application/json'
        }
      }

// Pass headers of admin to retreive user requests
axios.get('https://ssemmi-api.typehuman.dev/v1/sightings', requestAuth)
// Add list of users into the store of user requests
.then( sightings => {
  ## Actions that you want to take with the sightings
})
.catch(err => {
  console.error(`There was an error getting sightings: ${err}`)
})
```    




## Contributing code
The project is open source, we welcome anyone who would like to contribute.

You can see the status of the development process on the [GitHub Projects](https://github.com/Typehuman/SSEMMI/projects).

If you would like to contribute to an issue that has not been assigned yet, please add a comment to the issue indicating your interest. Thanks!
If you have feature suggestions, please add them as an issue. 
