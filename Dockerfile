FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
LABEL stage=build
WORKDIR /src
COPY ./DevApp ./DevApp
COPY ./DevApp.ViewModels ./DevApp.ViewModels
COPY ./DotNetifyLib.Elements ./DotNetifyLib.Elements
COPY ./LICENSE.md ./

RUN dotnet publish ./DevApp/dotNetify-Elements.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app .
ARG aspnetenv=Production

ENV ASPNETCORE_ENVIRONMENT ${aspnetenv}
CMD ASPNETCORE_URLS=http://*:$PORT dotnet dotNetify-Elements.dll