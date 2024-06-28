FROM eclipse-temurin:17-jdk-alpine as builder
WORKDIR /tmp
COPY . .
RUN ./mvnw clean package

FROM eclipse-temurin:17-jdk-alpine
COPY --from=builder /tmp/target/*.jar app.jar
CMD ["java","-jar","app.jar"]
