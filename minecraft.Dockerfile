FROM openjdk:17-jdk-slim
RUN mkdir -p /minecraft-tmp
WORKDIR /minecraft-tmp
# RUN wget -O minecraft.jar https://papermc.io/api/v1/paper/1.14.2/97/download
# 1.17.1 https://launcher.mojang.com/v1/objects/a16d67e5807f57fc4e550299cf20226194497dc2/server.jar
ADD https://launcher.mojang.com/v1/objects/a16d67e5807f57fc4e550299cf20226194497dc2/server.jar ./minecraft.jar
# RUN wget -O minecraft.jar https://launcher.mojang.com/v1/objects/a16d67e5807f57fc4e550299cf20226194497dc2/server.jar
RUN echo "eula=true" > eula.txt
WORKDIR /minecraft
CMD ["sh", "-c", "cp -R /minecraft-tmp/* . && java $JAVA_OPTS -jar minecraft.jar nogui"]