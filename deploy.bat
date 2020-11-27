@echo off

echo -- Build client app
call npm run build-prod --prefix ./DevApp

if "%1"=="local" goto :local
goto :heroku

:local
echo --- Remove any existing image
docker rmi dotnetify-elem -f

echo --- Build a new image
docker build -t dotnetify-elem -f ./Dockerfile . --build-arg aspnetenv=Production

echo --- Remove build images
docker image prune -f --filter label=stage=build
rd __tmp__ /q /s

echo --- Run a container on port 8081
docker run -it --rm -p:8081:80 --name dotnetify-elem_8081 dotnetify-elem

goto :end

:heroku
rem heroku login
call heroku container:login
call heroku container:push web -a dotnetify-elements
call heroku container:release web -a dotnetify-elements

:end