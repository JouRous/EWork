FROM mcr.microsoft.com/dotnet/aspnet:5.0-focal AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS build
WORKDIR /src
COPY "Api/Api.csproj" "Api/"
COPY "Abstractions/Abstractions.csproj" "Abstractions/"
COPY "Application/Application.csproj" "Application/"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/"

COPY . .
RUN dotnet restore --no-cache "Api/Api.csproj"

WORKDIR "/src/Api"
RUN dotnet build "Api.csproj" -c Release -o /app/build --no-restore

FROM build AS publish
RUN dotnet publish "Api.csproj" -c Release -o /app/publish --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.dll"]
