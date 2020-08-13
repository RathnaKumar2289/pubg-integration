## Basic Docker container commands:

docker container ls -a;
docker container run -p 8080:8080 -d imagename

Logs: 
docker container logs -f container-id

container pause/unpause:
docker container pause container-id
docker container unpause container-id


docker container inspect

remove all stopped container:
docker container prune;


stop :
Graceful stop:
docker container stop container-id;

Immediate stop:
docker container kill container-id;

Automatically start container on starting the docker:
docker container run -p 8080:8080 -d --restart=always imagename

Docker stats:
docker events

TOP::
see all the processes which are running in that specific container.

docker top <container-id>

STATS::
See details of ContainerID,CPU,Memory
docker stats

Start container with Memory & CPU(100000=100%):
docker run -p 8080:8080 -m 512m --cpu-quota 50000 -d imagename


## Use Cases

docker pull imagename:tag
docker image ls
Run:
docker run -d --name containername imagename:tag  (-d = Detach mode)
docker ps -a

CHECK local service status:
sudo service mongodb status

Stop ::
docker stop containerID

Running Mongo with Port Mapping example: Data lost when restarting docker container
docker run -p 27017:27017 -d mongo:3.4-jessie

Mongo with Volume Mapping:Data persistance
docker run -p 27017:27017 -v/mongo/data:/data/db -d mongo:3.4-jessie


1.Docker Image Build:
Go to Dockerfile Folder
Syntax: docker build -t <IMAGENAME>:<version> .
EG:docker build -t springimage .

2.Start Container:
SYNTAX: docker run -d --name <CONTAINERNAME> --network=host <IMAGENAME>
EG: docker run -d --name springcontainer --network=host springimage

3.List Image:  docker image ls
4.List Containers: docker ps -a


5.Push to Docker Hub:
->create repository with description.

->docker login --username = username --password = pwd

-> docker tag imageid repositoryname:version
-> docker push repositoryname:version

## Docker compose:
Build image -> docker-compose build

create container -> docker-compose up 

Make sure local mysql & mongo are not active:
Command to stop (sudo service mysql stop , sudo service mongo stop)



Check Log: docker logs containerID





## Networking
A better alternative to --link is to launch both the applications into a custom docker network.

docker network ls
docker network create web-application-mysql-network
docker inspect web-application-mysql-network
 
docker run --detach --env MYSQL_ROOT_PASSWORD=dummypassword --env MYSQL_USER=todos-user --env MYSQL_PASSWORD=dummytodos --env MYSQL_DATABASE=todos --name mysql --publish 3306:3306 mysql:5.7
 
docker run --detach --env MYSQL_ROOT_PASSWORD=dummypassword --env MYSQL_USER=todos-user --env MYSQL_PASSWORD=dummytodos --env MYSQL_DATABASE=todos --name mysql --publish 3306:3306 --network=web-application-mysql-network mysql:5.7
 
docker inspect web-application-mysql-network
