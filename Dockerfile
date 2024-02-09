FROM openjdk:17

ARG JAR_FILE=build/libs/runaway-0.0.1-SNAPSHOT.jar

ARG REACT_URL

ENV REACT_URL=$REACT_URL

COPY ${JAR_FILE} app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]