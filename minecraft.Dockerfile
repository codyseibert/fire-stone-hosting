FROM openjdk:8
RUN mkdir -p /minecraft
WORKDIR /minecraft
RUN wget -O paperspigot.jar https://papermc.io/api/v1/paper/1.14.2/97/download
RUN echo "eula=true" > eula.txt
COPY server.properties /minecraft
CMD java -Xmx1024M -Xms1024M -jar paperspigot.jar nogui