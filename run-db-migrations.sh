#!/bin/bash

ROOT=${1}
DB_SCRIPT_DIR=${ROOT}/db-migrations

for file in $(ls ${DB_SCRIPT_DIR}) ; do
  echo ${file}
  docker exec -i scw11-postgres psql -U postgres < ${DB_SCRIPT_DIR}/${file}
done
