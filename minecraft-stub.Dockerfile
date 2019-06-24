FROM openjdk:8
RUN mkdir -p /minecraft
WORKDIR /minecraft
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install nodejs
RUN npm install -g http-server
CMD http-server -p 25565 .