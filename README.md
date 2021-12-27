# Documentation

Read a more detailed documentation on our docsify page [here](https://codyseibert.github.io/fire-stone-hosting)

# What is this project?
- The goal of this project is to create a minecraft server hosting system which could potentially be used as a real product to rent out minecraft servers to other people.

# Contributing
- Anyone is welcome to contribute to this project via github, just ensure you are following the guidelines for contributing to this project mentioned at CONTRIBUTING.md; just fork the project and submit a pull request, and I'll try to give it a timely review when I get a chance.

# Creating Issues
- If you find a bug with the code, or you would like to request for a feature, you can go to the issues section and create a thread. If you want to request a feature in a specific directory, we require you to tap on the directory name and create the feature request thread from there. If you want all 3 diretories, we request you to add the feature to the feature request section and we will add all the directories as labels.

# Building in Public

I'm trying to document this project via my [Youtube Channel](https://www.youtube.com/c/webdevjunkie) on this specific youtube series found [here](https://bit.ly/minecraftvlogseries).

# Getting Started

This project is setup using a [npm workspace](https://docs.npmjs.com/cli/v8/using-npm/workspaces) monorepo in order to setup the multiple projects run the following commands in the root folder:

1. `npm run install-workspace`: Install all dependencies for the workspace
2. For running each project use:
   - `npm run dev:agent`: Runs agent project
   - `npm run dev:api`: Runs api project
   - `npm run dev:client`: Runs client project
   - `npm run db`: Starts postgres db in Docker locally
   - `npm run migrate -- dev`: Runs all migrations for the project

You will need the following installed in order for the agent to be able to run the minecraft servers and accept commands:

- docker (used for wrapping and hosting the minecraft server)
- socat (used for communicating via stdin to the running docker container)
