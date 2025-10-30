# build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY GuarujaProject/*.csproj ./GuarujaProject/
RUN dotnet restore ./GuarujaProject/GuarujaProject.csproj
COPY GuarujaProject/. ./GuarujaProject/
WORKDIR /src/GuarujaProject
RUN dotnet publish -c Release -o /app/publish

# runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "GuarujaProject.dll"]


