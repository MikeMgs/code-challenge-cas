# code-challenge
TO RUN THE APP
```
docker compose build
docker compose up
```
You must use the url that docker assigned to the image container to ./client/helpers/urls.jsx

# Debug

docker compose up -d --force-recreate
docker compose exec -it web /bin/sh
docker compose exec -it db /bin/sh
