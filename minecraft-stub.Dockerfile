FROM openjdk:8
RUN mkdir -p /minecraft
WORKDIR /minecraft
CMD while sleep 1; do echo "yolo"; done