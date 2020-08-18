#!/bin/bash

docker kill scw11-api-server scw11-postgres
docker rm scw11-api-server scw11-postgres
docker network rm scw11-net

docker pull postgres
docker run --rm --name scw11-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

#cd ./backend
#docker build -t scw11-api-server:latest .
#docker run --rm -d -p 5000:5000 --name scw11-api-server scw11-api-server 

#docker network create scw11-net
#docker network connect scw11-net scw11-postgres
#docker network connect scw11-net scw11-api-server

#echo "run:"
#echo
#echo "$ python <repo_root>/scripts/csv_ingest.py <filepath>"
#echo
#echo "to initialize database"
