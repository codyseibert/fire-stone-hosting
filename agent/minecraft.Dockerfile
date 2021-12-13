FROM openjdk:17-jdk-slim
RUN mkdir -p /minecraft-tmp
WORKDIR /minecraft-tmp
ADD https://launcher.mojang.com/v1/objects/a16d67e5807f57fc4e550299cf20226194497dc2/server.jar ./minecraft.jar
RUN echo "eula=true" > eula.txt
WORKDIR /minecraft
CMD ["sh", "-c", "cp -R /minecraft-tmp/* . && java $JAVA_OPTS -jar minecraft.jar nogui"]