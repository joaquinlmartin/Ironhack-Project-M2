# Project-M2

## Description 

A pokemon searching cards app

## User Actions

404: As a user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

Sign up: As an user I can sign up in the platform

Login: As a user I can login to the platform and go to my profile/dashboard.

Logout: As a user I can logout from the platform so no one else can use it

Edit profiles As a user I can edit my profile.

## Requirements
### Authentication
Auth Service
auth.login(user)
auth.signup(user)
auth.logout()
auth.getUser() // synchronous

### Modelos
```js
User model

{
    userName: String,
    email: String,
    hashedPassword: String,
}

Poke model

{ 
	cardID: Number,
	image: String,
	name: String ,
	element: String,
	description: String,
	atributo1: String,
	atributo2: String,
	atributo3: String,
	skill: String,
	ability: String,
	clase: String,

}
```

## Rutas


|            |                                     |                                                              |                |              |                        |
| ---------- | ----------------------------------- | ------------------------------------------------------------ | -------------- | ------------ | ---------------------- |
| **Method** | **Route**                           | **Description**                                              | Success status | Error status | Request - Body         |
| `GET`      | `/`                                 | Main page route.                                             |                |              |                        |
| `GET`      | `auth/login`                        | Renders `login` form view.                                   |                |              |                        |
| `POST`     | `auth//login`                       | Sends Login form data to the server.                         | 200            | 401          | { email, password }    |
| `GET`      | `auth/signup`                       | Renders `signup` options.                                    | 201            | 404          |                        |
| `GET`      | `auth/signup-user`                  | Renders `signup` form view for user.                         | 201            | 404          |                        |
| `POST`     | `auth/signup-user`                  | Sends Sign Up info to the server and creates promoter user in the DB. | 201            | 404          | { email, password }    |
| `GET`      | `auth/signup-user`                  | Sign up page for venues.                                     | 201            | 404          |                        |
| `POST`     | `auth/signup-venue`                 | Sends Sign Up info to the server and creates  venue user in the DB. | 201            | 404          | { email, password }    |
| `GET`      | `/private/promoterprofile`          | Shows promoter profile details with bookings                 |                |              |                        |
| `GET`      | `/private/edit-promoterprofile`     | Private route. Shows`edit-promoter profile` form.            |                |              |                        |
| `PUT`      | `/private/edit-promoterprofile`     | Private route. Sends edit-profile info to server and updates promoter user in DB. | 200            | 400          | JSON                   |
| `DELETE`   | ``/private/delete-promoterprofile`` | Delete profile                                               | 201            | 400          | {id}                  
| `POST`     | `/private/logout`                   | Logs out the user                                            | 204            | 400          |                        |
| `GET`      | `/search`                           | Shows search form                                            | 200            | 400          |                        |
| `POST`     | `/search`                           | Shows venue's results                                        |                |              | {city, capacity, date} |
                 

<br>

## Backlog




