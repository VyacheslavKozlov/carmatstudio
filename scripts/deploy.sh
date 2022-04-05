#!/usr/bin/env bash

mvn clean package

echo 'Copy files...'

scp target/carmat-0.0.1-SNAPSHOT.jar \
    junior@195.161.69.71:/home/junior/webapps/carmat/

echo 'Restart server...'

ssh -T junior@195.161.69.71 << EOF

pgrep java | xargs kill -9
nohup java -jar /home/junior/webapps/carmat/carmat-0.0.1-SNAPSHOT.jar > /home/junior/webapps/carmat/log.txt &

EOF

echo 'Bye'