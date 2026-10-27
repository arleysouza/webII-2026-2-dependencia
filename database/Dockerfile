FROM postgres:18-alpine

COPY init.sql /docker-entrypoint-initdb.d/init.sql
COPY seed.sql /docker-entrypoint-initdb.d/seed.sql

