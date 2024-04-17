FROM node:lts-alpine
EXPOSE 3000

ENV PUID=1000
ENV PGID=1000
ENV USER=node

VOLUME [ /app ]

COPY ./entrypoint.sh /entrypoint.sh
COPY ./set-up-user.sh /usr/local/bin/set-up-user.sh

ENTRYPOINT [ "/entrypoint.sh" ]