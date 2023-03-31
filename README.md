<!-- ABOUT THE PROJECT -->
<h1 align="center">JS CLI NOTES</h1>

This CLI allows you to use various commands and arguments to create, edit, read, encrypt and decrypt notes


# Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/Kukiezi/js-cli-notes
   ```
2. Install NPM packages
   ```sh
   npm install
   ```


<!-- USAGE EXAMPLES -->
# Commands

## create
Create a new note

Options:

* --creator: Email of creator of the note. (required)
* --title: The title of the note. (required)
* --text: The text of the note. (required)
* --encrypt: If added encrypts the note's text. (optional)

Usage:
```sh
node notes create --creator "test@gmail.com" --title "My first note" --text "This note is awesome!"
```
or if you want encryption:
```sh
node notes create --creator "test@gmail.com" --title "My first note" --text "This note is awesome!" --encrypt
```

## edit
Create a new note

Options:

* --id: The ID of the note to edit. (required)
* --title: The new title of the note. (optional)
* --text: The new text of the note. (optional)

Usage:
```sh
node notes edit -- --id 1 --text "Updated note text"
```
or if you want upate encrypted note:
```sh
node notes edit -- --id 1 --text "Updated note text" --secret 'SECRET_USED_FOR_ENCRYPTION'
```

## read
Read a note's text

Options:

* --id: The ID of the note to read. (required)
* --secret: The secret that was used for encryption. (optional)

Usage:
```sh
node notes read -- --id 1
```
or if you want to read encrypted note:
```sh
node notes read -- --id 1 --secret 'YOUR_SECRET'
```

## showAll
Prints all created notes in console with IDs

Usage:
```sh
node notes showAll
```

## help
Just to get some help!

Usage:
```sh
node notes help
```
