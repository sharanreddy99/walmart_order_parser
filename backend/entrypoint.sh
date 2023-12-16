#!/bin/bash
echo "Waiting for mysql. This may take few more seconds ..."
until nc -z -v -w30 db 3306; do
    echo >&2 "Waiting for mysql. This may take few more seconds ..."
    sleep 10
done
echo "mysql connection established..."

flask db migrate -m "Create Tables Migration"
flask db upgrade
# sleep 100000
flask run --host=0.0.0.0 --debug
