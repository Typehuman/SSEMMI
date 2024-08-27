# Contributing to the project
Hi there. Thanks for your interest in contributing to our data cooperative and open source software! Our cooperative efforts will be strengthened the more our community engages in three activities:

1. Contributing data to the cooperative with provenance defined per the [Acartia data cooperative community guidelines](https://acartia.io/register)
2. Utilizing data from the cooperative and attributing the use per the [Acartia data cooperative community guidelines](https://acartia.io/register)
3. Improving our open source code and documentation

## Accessing recent data without registration

The fastest way to experiment with Acartia data is to `GET` data via the "current" sightings API endpoint:

- [HTTP request: https://acartia.io/api/v1/sightings/current](https://acartia.io/api/v1/sightings/current)
- `GET acartia.io/api/v1/sightings/current` (e.g. via [Postman](https://web.postman.co/))

The current endpoint returns the last week of marine animal locations from the entire [geographic domain of Acartia](https://github.com/salish-sea/acartia/wiki/1.-Context-for-SSEMMI-&-Acartia#spatial-boundaries-related-to-acartia) (all species; visual _and_ acoustic observations; all providers; all trust levels; etc.)

See the Acartia wiki section on [Open source code for retrieving and parsing "current" Acartia data](https://github.com/salish-sea/acartia/wiki/3.-Dev-resources#open-source-repos-and-sample-code).


## Contributing and utilizing data
There are two ways to contribute data to the data cooperative, once authenticated. First, the Acartia user interface allows you to directly add your data to
using a comma-separated-variable spreadsheet template. Alternatively, data can be added via our API once you have registered and obtained your unique digital identity and API tokens.

During phase one (2021-23), data providers include: [Orca Network](https://orcanetwork.org) and [Orcasound](https://orcasound.net), and [Conserve.io](https://conserve.io) -- developer of the Whale Alert and Ocean Alert mobile apps, and the Cascadia web app.

If you wish to contribute to, utilize, or integrate programmatically with our open access data - follow the steps:

### Join the Acartia data cooperative
1. Go to the [project website](https://acartia.io) and click on register
2. Fill out the registration form and click 'Sign up'
3. An administrator will review your request and notify you when your account is set up.


### Integrate Acartia with your website or web app
These steps can be undertaken once your account has been approved.
1. Go to the [Acartia project website](https://acartia.io) and click on Login
2. Enter your email and password and click 'login'
3. You will see two sections; **Contributor Profile** and **Your Active Tokens**. You can add your information to 
Contributor Profile now, or alternatively update it later.

>Contributor profile stores information that is added to records that you contribute.
>Your Active Tokens shows your API tokens. Your first token, titled **Default**, is created automatically for you. 
>If you wish to create another token, click **Create Token** and enter a name for the new token.

4. Copy your token. Avoid storing it directly in your code! Add it as a Bearer token when making requests to the 
[Sightings API](DOCS.md#markdown-header-sightings).

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

5. Finally, there is the structure of the data. When you send data to the [Sightings API](DOCS.md#markdown-header-sightings),
only data that fits in this format will be stored. The format is shown below:

   >- **data_source_name:** The name of the data entry
   >- **data_source_entity:** Your organization 
   >- **data_source_id:** the ID of the record in your system
   >- **created:** The date and time when the observation occurred (in time zone local to the reported position)
   >- **photo_url:** The URL of the photo sighting
   >- **no_sighted:** The number of whales sighted
   >- **latitude:** Latitude of the sighting (decimal degrees)
   >- **longitude:** Longitude of the sighting (decimal degrees)
   >- **data_source_witness:** The name of the witness
   >- **data_source_comments:** Any comments added by the witness

**Example data formats**
From an API query of recent data
```
{"ssemmi_id":"SPOTTER138809","data_source_name":"Spotter-API","data_source_entity":"Conserve.io","data_source_id":138809,"created":"2021-11-19 19:54:37","photo_url":"","no_sighted":1,"latitude":34.304557056,"longitude":-119.867284608,"type":"Humpback","data_source_witness":"whalealert","trusted":1,"data_source_comments":"<br><br>Submitted by a Trusted Observer","profile":{"name":"spotter"},"entry_id":"aedfd0a5-72b2-445d-a12b-6f4c07793548","ssemmi_date_added":"Sat Nov 20 2021 00:05:01 GMT+0000 (Coordinated Universal Time)","submitter_did":"did:ethr:0x20fd1096eaafb242a88272e20d7a77b552fa6cd8","signature":
```

Breaking this out to be more readable, you can see the cooperative's data scheme includes a few fields beyond what is required when posting a new record:

```
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
> "entry_id":"aedfd0a5-72b2-445d-a12b-6f4c07793548"
> "ssemmi_date_added":"Sat Nov 20 2021 00:05:01 GMT+0000 (Coordinated Universal Time)"
> "submitter_did":"did:ethr:0x20fd1096eaafb242a88272e20d7a77b552fa6cd8"
> "signature":{"r":"e23d0799aa3e4a2de8b1862e9f2d1042f3318e4df18b9775b24d24ce68c56118","s":"c084231bcffab60fb8a598ba9e7bc30246cf16e399554e17c5a00ae76ccc6f95"}
```


## Contributing code
The project is open source. We welcome anyone who would like to contribute under the MIT license.

You can see the status of the development process in the [Acartia project management board](https://github.com/orgs/salish-sea/projects/1/views/1). Use [Acartia discussions](https://github.com/salish-sea/acartia/discussions) to ask questions, make a proposal, or get feedback on your ideas.

If you would like to contribute to an issue that has not been assigned yet, please add a comment to the issue indicating your interest. To facilitate the review and merging process, we prefer to discuss potential solutions first within the issue. With a plan in place, you can then fork the repository and submit a pull request with a single, incremental contribution. Thanks!

If you have feature suggestions, please add them as an issue and add the "Enhancement" label. If you find a bug, submit an issue and add the "Bug" label.
