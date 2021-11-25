# Contributing to the project
Hi there. Thanks for your interest in contributing to our data cooperative and open source software!

## Contributing data
There are two ways to contribute data to the data cooperative. Once authenticated, the user interface allows you to directly add your data to
using a comma-separated-variable spreadsheet template. Data can also be added through our API once you have become a data cooperative partner and obtained your unique digital identity and API tokens.

During phase one (2021-22), data providers include: [Orca Network](https://orcanetwork.org), [Orcasound](https://orcasound.net), and [Conserve.io](https://conserve.io) -- developer of the Whale Alert and Ocean Alert mobile apps, and the Cascadia web app.

If you wish to contribute to, or integrate with, our open access data - follow the steps;

### Sign up to SSEMMI Project
1. Go to the [SSEEMMI Project website](https://acartia.io) and click on register
2. Fill out the registration form and click 'Sign up'
3. An administrator will review your request and notify you when your account is set up.


### Integrate SSEMMI with your website
These steps can be undertaken once your account has been approved.
1. Go to the [project website](https://acartia.io) and click on Login
2. Enter your email and password and click 'login'
3. You will see two sections; **Contributor Profile** and **Your Active Tokens**. You can add your information to 
Contributor Profile now, or alternatively update it later.

>Contributor profile stores information that is added to records that you contribute.
>Your Active Tokens shows your API tokens. Your first token, titled **Default**, is created automatically for you. 
>If you wish to create another token, click **Create Token** and enter a name for the new token.

4. Copy your token Avoid storing it directly in your code! Add it as a Bearer token when making requests to the 
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
axios.get('https://acartia.io/v1/sightings', requestAuth)
// Add list of users into the store of user requests
.then( sightings => {
  ## Actions that you want to take with the sightings
})
.catch(err => {
  console.error(`There was an error getting sightings: ${err}`)
})
```    

5. Finally, there is the structure of the data. When you send data to the [Sightings Api](DOCS.md#markdown-header-sightings),
only data that fits in this format will be stored. The format is shown below:

   >- **data_source_name:** The name of the data entry
   >- **data_source_entity:** Your organisation 
   >- **data_source_id:** the ID of the record in your system
   >- **created:** When was the sighting record created
   >- **photo_url:** The URL of the photo sighting
   >- **no_sighted:** The number of whales sighted
   >- **latitude:** Latitude of the sighting
   >- **longitude:** Longitude of the sighting
   >- **data_source_witness:** The name of the witness
   >- **data_source_comments:** Any comments added by the witness

**Example data formats**
From an API query of recent data
```
{"ssemmi_id":"SPOTTER138809","data_source_name":"Spotter-API","data_source_entity":"Conserve.io","data_source_id":138809,"created":"2021-11-19 19:54:37","photo_url":"","no_sighted":1,"latitude":34.304557056,"longitude":-119.867284608,"type":"Humpback","data_source_witness":"whalealert","trusted":1,"data_source_comments":"<br><br>Submitted by a Trusted Observer","profile":{"name":"spotter"},"entry_id":"aedfd0a5-72b2-445d-a12b-6f4c07793548","ssemmi_date_added":"Sat Nov 20 2021 00:05:01 GMT+0000 (Coordinated Universal Time)","submitter_did":"did:ethr:0x20fd1096eaafb242a88272e20d7a77b552fa6cd8","signature":

> "ssemmi_id":"SPOTTER138809"
> "data_source_name":"Spotter-API"
> "data_source_entity":"Conserve.io"
> "data_source_id":138809
> "created":"2021-11-19 19:54:37"
> "photo_url":""
> "no_sighted":1
> "latitude":34.304557056
> "longitude":-119.867284608
> "type":"Humpback"
> "data_source_witness":"whalealert"
> "trusted":1
> "data_source_comments":"<br><br>Submitted by a Trusted Observer"
> "profile":{"name":"spotter"}
. "entry_id":"aedfd0a5-72b2-445d-a12b-6f4c07793548"
> "ssemmi_date_added":"Sat Nov 20 2021 00:05:01 GMT+0000 (Coordinated Universal Time)"
> "submitter_did":"did:ethr:0x20fd1096eaafb242a88272e20d7a77b552fa6cd8"
> "signature":{"r":"e23d0799aa3e4a2de8b1862e9f2d1042f3318e4df18b9775b24d24ce68c56118","s":"c084231bcffab60fb8a598ba9e7bc30246cf16e399554e17c5a00ae76ccc6f95"}
```


## Contributing code
The project is open source. We welcome anyone who would like to contribute.

You can see the status of the development process on the [GitHub Projects](https://github.com/Typehuman/SSEMMI/projects).

If you would like to contribute to an issue that has not been assigned yet, please add a comment to the issue indicating your interest. Thanks!
If you have feature suggestions, please add them as an issue and add the "Enhancement" label. 
