[![Build Docker-Image](https://github.com/TheEverythingTracker/Backend/actions/workflows/docker-publish.yml/badge.svg?branch=main)](https://github.com/TheEverythingTracker/Backend/actions/workflows/docker-publish.yml)

# TheEverythingTracker Frontend

Web App for playing video and interactively tracking displayed objects.

## How to run

### Docker

#### Prerequisites:

You need Docker installed on your machine. See [Docker Docs](https://docs.docker.com/engine/install/) for installation
instructions.

##### Pull the Frontend Image and run a container:

```shell
docker pull ghcr.io/theeverythingtracker/frontend:main 
```

```shell
docker run -it -p 8080:80 --name 'TheEverythingTracker_Frontend' ghcr.io/theeverythingtracker/frontend:main
```

#### Pull the Backend Image and run a container:

```shell
docker pull ghcr.io/theeverythingtracker/backend:main
```

```shell
docker run -it -p 8000:8000 --name 'TheEverythingTracker_Backend' ghcr.io/theeverythingtracker/backend:main
```

#### Connect to the Frontend:

[TheEverythingTracker](http://localhost:8080)

### Without Docker (for development):

See ["Set up"](#set-up)

## Technology Overview

This application is built with [React](https://react.dev/) and TypeScript
using [MUI](https://mui.com/material-ui/getting-started/) for Material UI Components.

## Contributing

### Guidelines

- Every feature should be described in an issue and implemented in a branch linked to that issue

### Set up

1. If you don't have it yet: Install npm (see
   these [docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
1. Clone this repository
1. Install the dependencies with ```npm install```.
1. Run the application with ```npm run start```
1. Learn how to set up the Backend here: [TheEverythingTracker/Backend](https://github.com/TheEverythingTracker/Backend)

### Build a new Docker Image

Whenever new Changes are pushed to the "main" branch, a new Docker image will be built
by
this [GitHub Actions Pipeline](https://github.com/TheEverythingTracker/Frontend/actions/workflows/docker-publish.yml).
You can find the latest Docker image [here](https://github.com/orgs/TheEverythingTracker/packages?repo_name=Frontend).
