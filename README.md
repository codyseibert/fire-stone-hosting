# What is this project?

The goal of this project is to create a minecraft server hosting system which could potentially be used as a real product to rent out minecraft servers to other people. Anyone is welcome to contribute to this project via github; just fork the project and submit a pull request, and I'll try to give it a timely review when I get a chance. Try to keep pull requests small, and remember to tag any associated issue number if the pull request fixes or implements a specific issue.

# Building in Public

I'm trying to document this project via my youtube channel [https://www.youtube.com/c/webdevjunkie](https://www.youtube.com/c/webdevjunkie) on this specific youtube series found here: [https://bit.ly/minecraftvlogseries](https://bit.ly/minecraftvlogseries).

# Getting Started

This project is setup using a [npm workspace](https://docs.npmjs.com/cli/v8/using-npm/workspaces) monorepo in order to setup the multiple projects run the following commands in the root folder:

1. `install-workspace`: Install all dependencies for the workspace
2. For running each project use:
   - `dev:agent`: Runs agent project
   - `dev:api`: Runs api project
   - `dev:client`: Runs client project

You will need the following installed in order for the agent to be able to run the minecraft servers and accept commands:

- docker (used for wrapping and hosting the minecraft server)
- socat (used for communicating via stdin to the running docker container)

In order to start and configure the postgresql database, follow these steps

- In the root folder run `docker-compose up -d`
- Inside `api` run `npx prisma migrate dev` in order to apply pending migrations

# Flows

Below are the various high level architecture flows that occur in our system, such as when someone rents a server, or when someone sends a command to the MC Docker container.

### Renting a New Server

<img width="717" alt="Screen Shot 2021-12-12 at 2 24 26 AM" src="https://user-images.githubusercontent.com/1868782/145704131-8fa93776-c62f-403b-a890-bbc78fd1fbe9.png">
