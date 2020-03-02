FROM java:8-jre
WORKDIR usr/src
ENV MONGO_DATABASENAME=pubg
ENV MONGO_URL=mongodb://localhost:27017/pubg
ADD ./target/favouriteservice-0.0.1-SNAPSHOT.jar /usr/src/favouriteservice-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","favouriteservice-0.0.1-SNAPSHOT.jar"]