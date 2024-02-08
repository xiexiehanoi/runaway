FROM openjdk:17

ARG JAR_FILE=build/libs/runaway-0.0.1-SNAPSHOT.jar

ARG BASE_URL="https://www.runaway.fun"
ARG RUN_ENV="product"

ENV BASE_URL="${BASE_URL}"
ENV RUN_ENV="${RUN_ENV}"

COPY ${JAR_FILE} app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]