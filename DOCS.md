<a name="top"></a>
# SSEMMI Api Documentation v0.1.0

The documentation for the SSEMMI open API project.

# Table of contents

- [Auth](#markdown-header-auth)
  - [Authenticate](#markdown-header-authenticate)
- [PasswordReset](#markdown-header-passwordreset)
  - [Send email](#markdown-header-send-email)
  - [Submit password](#markdown-header-submit-password)
  - [Verify token](#markdown-header-verify-token)
- [Sightings](#markdown-header-sightings)
  - [Contribute sightings](#markdown-header-contribute-sightings)
  - [Delete specific sightings](#markdown-header-delete-specific-sightings)
  - [Retrieve current sightings](#markdown-header-retrieve-current-sightings)
  - [Retrieve sightings marked as trusted](#markdown-header-retrieve-sightings-marked-as-trusted)
  - [Retrieve specific sightings](#markdown-header-retrieve-specific-sightings)
- [User](#markdown-header-user)
  - [Create user](#markdown-header-create-user)
  - [Create user token](#markdown-header-create-user-token)
  - [Create/update user profile](#markdown-header-create/update-user-profile)
  - [Delete token](#markdown-header-delete-token)
  - [Delete user](#markdown-header-delete-user)
  - [Get user tokens](#markdown-header-get-user-tokens)
  - [Retrieve current user](#markdown-header-retrieve-current-user)
  - [Retrieve current user requests](#markdown-header-retrieve-current-user-requests)
  - [Retrieve user](#markdown-header-retrieve-user)
  - [Retrieve users](#markdown-header-retrieve-users)
  - [Update password](#markdown-header-update-password)
  - [Update user](#markdown-header-update-user)

___


# Auth

## Authenticate
[Back to top](#top)

```
POST /auth
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | Basic authorization with email and password. |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | Master access_token. |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | User <code>access_token</code> to be passed to other requests. |
| user | `Object` | Current user's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | Master access only or invalid credentials. |

# PasswordReset

## Send email
[Back to top](#top)

```
POST /password-resets
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | Email address to receive the password reset token. |
| link | `String` | Link to redirect user. |

### Success response

#### Success response - `Success 202`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 202 |  | Accepted. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |

## Submit password
[Back to top](#top)

```
PUT /password-resets/:token
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| password | `String` | User's new password._Size range: 6.._<br> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | User's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 404 |  | Token has expired or doesn't exist. |

## Verify token
[Back to top](#top)

```
GET /password-resets/:token
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | Password reset token. |
| user | `Object` | User's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | Token has expired or doesn't exist. |

# Sightings

## Contribute sightings
[Back to top](#top)

```
POST /sightings
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Entry | `Object` | of sighting. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 |  | Invalid input. |

## Delete specific sightings
[Back to top](#top)

```
DELETE /sightings/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 200 | `Object` | Deleted sighting entry. |

## Retrieve current sightings
[Back to top](#top)

```
GET /sightings/current
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| List | `Object` | of sightings. |

## Retrieve sightings marked as trusted
[Back to top](#top)

```
GET /sightings/trusted
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Sightings | `Object` | with trusted source. |

## Retrieve specific sightings
[Back to top](#top)

```
GET /sightings/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Sighting | `Object` | based on id. |

# User

## Create user
[Back to top](#top)

```
POST /users
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | Master access_token. |
| email | `String` | User's email. |
| password | `String` | User's password._Size range: 6.._<br> |
| name | `String` | **optional** User's name. |
| picture | `String` | **optional** User's picture. |
| isApproved | `String` | **optional** if the user is approved by admin. |
| role | `String` | **optional** User's role._Default value: user_<br>_Allowed values: user,admin_ |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | User's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Master access only. |
| 409 |  | Email already registered. |

## Create user token
[Back to top](#top)

```
POST /users/:id/tokens
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | Master access_token. |
| name | `String` | **optional** name of token. |
| id | `Number` | user id |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | token |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Master access only. |

## Create/update user profile
[Back to top](#top)

```
POST /users/:id/profile
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | Master access_token. |
| name | `String` | **optional** Contributor name. |
| website | `String` | **optional** Contributor website. |
| logoFile | `String` | **optional** Base64 of contributor logo. |
| id | `Number` | user id |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | profile |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Master access only. |

## Delete token
[Back to top](#top)

```
DELETE /users/tokens/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token |
| id | `String` | user token id |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | No Content. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | Authorized access only. |
| 404 |  | Token not found. |

## Delete user
[Back to top](#top)

```
DELETE /users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |
| id | `Number` | The user id to be deleted. |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | No Content. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | Admin access only. |
| 404 |  | User not found. |

## Get user tokens
[Back to top](#top)

```
GET /users/:id/tokens
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | user id |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | tokend |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Master access only. |

## Retrieve current user
[Back to top](#top)

```
GET /users/me
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | User's data. |

## Retrieve current user requests
[Back to top](#top)

```
GET /users/requests
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | request User's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Admin access only. |

## Retrieve user
[Back to top](#top)

```
GET /users/:id
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | User's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | User not found. |

## Retrieve users
[Back to top](#top)

```
GET /users
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |
| q | `String` | **optional** Query to search. |
| page | `Number` | **optional** Page number._Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** Amount of returned items._Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** Order of returned items._Default value: -createdAt_<br> |
| fields | `String[]` | **optional** Fields to be returned. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| users | `Object[]` | List of users. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Admin access only. |

## Update password
[Back to top](#top)

```
PUT /users/:id/password
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | Basic authorization with email and password. |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| password | `String` | User's new password._Size range: 6.._<br> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | User's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Current user access only. |
| 404 |  | User not found. |

## Update user
[Back to top](#top)

```
PUT /users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | User access_token. |
| name | `String` | **optional** User's name. |
| picture | `String` | **optional** User's picture. |
| isApproved | `String` | **optional** if the user is approved by admin. |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | User's data. |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | Some parameters may contain invalid values. |
| 401 |  | Current user or admin access only. |
| 404 |  | User not found. |

