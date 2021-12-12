# What is this project?

The goal of this project is to create a minecraft server hosting system which could potentially be used as a real product to rent out minecraft servers to other people.  Anyone is welcome to contribute to this project via github; just fork the project and submit a pull request, and I'll try to give it a timely review when I get a chance.  Try to keep pull requests small, and remember to tag any associated issue number if the pull request fixes or implements a specific issue.

# Building in Public

I'm trying to document this project via my youtube channel [https://www.youtube.com/c/webdevjunkie](https://www.youtube.com/c/webdevjunkie) on this specific youtube series found here: [https://www.youtube.com/watch?v=9JKRFKje2Ew&list=PL6x5Q-Sj_BlYlBoxMa_jo7LO3OSUhhbru](https://www.youtube.com/watch?v=9JKRFKje2Ew&list=PL6x5Q-Sj_BlYlBoxMa_jo7LO3OSUhhbru).

# Getting Started

This project is broken up into 3 main components: agent, api, and client.  Each component has it's own package.json and will need to be setup and install individually.  To get started, do the following:

- client: `cd client && npm i && npm start` 
- server: `cd server && npm i && npm start` 
- agent: `cd agent && npm i && npm start` 

You will need the following installed in order for the agent to be able to run the minecraft servers and accept commands:

- docker (used for wrapping and hosting the minecraft server)
- socat (used for communicating via stdin to the running docker container)

