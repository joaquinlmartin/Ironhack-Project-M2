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


## Rutas



## Backlog




