FROM openjdk:17

ARG JAR_FILE=build/libs/runaway-0.0.1-SNAPSHOT.jar

ENV REACT_URL="${REACT_URL}"
ENV RUN_ENV="${RUN_ENV}"

COPY ${JAR_FILE} app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]