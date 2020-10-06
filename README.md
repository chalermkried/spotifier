# Spotifier

A simple web application that connects and plays with the Spotify's API.

[Spotify API Docs](https://developer.spotify.com/documentation/web-api/)

This project is setup to be built with SSG, no server side rendering is required.

## Features

- Authenticate to the API with both real Spotify account or use a guest token.
- Basic user info fetching. (If logged in via the real account)
- Fully responsive UI.
- Infinite scroll data fetching.
- Ability to either see the new releases album content (default) or search for albums.

## Directions

#### Development

- Install the prerequisites and then run `npm run dev` to start the Next.js local server.
- Note: Since Spotify API requires to specify the redirection link, currently, only http://localhost:3000 is supported.
