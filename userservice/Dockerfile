FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=UserDb
ENV MYSQL_URL=jdbc:mysql://localhost:3306/UserDb
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ADD ./target/userservice-0.0.1-SNAPSHOT.jar /usr/src/userservice-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","userservice-0.0.1-SNAPSHOT.jar"]
