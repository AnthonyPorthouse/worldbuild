#! /usr/bin/env sh

PUID=${PUID:-1000}
PGID=${PGID:-1000}
USER=${USER:-"node"}

set-up-user.sh "$USER" "$PUID" "$PGID"

set_permissions() {
    chown -R "${USER}":"${USER}" "/app"
}

set_permissions
COMMAND="${*:-"npm run start:dev"}"
su "${USER}" -c "$COMMAND"


