FROM openjdk:8
RUN mkdir -p /minecraft-tmp
WORKDIR /minecraft-tmp
# RUN wget -O minecraft.jar https://papermc.io/api/v1/paper/1.14.2/97/download
RUN wget -O minecraft.jar https://launcher.mojang.com/v1/objects/d0d0fe2b1dc6ab4c65554cb734270872b72dadd6/server.jar
RUN echo "eula=true" > eula.txt
WORKDIR /minecraft
CMD ["sh", "-c", "cp -R /minecraft-tmp/* . && java -jar minecraft.jar nogui"]