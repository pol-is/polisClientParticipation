FROM node:6.2.0

# sudo docker image build -t polis-client-participation:1.0 .
# sudo docker container run --network="host" --publish 5000:5000 --detach --name polis-client-participation polis-client-participation:1.0
# sudo docker container kill polis-client-participation
# sudo docker container rm polis-client-participation
# sudo docker logs polis-client-participation
# --network="host" 

# sudo docker container kill polis-client-participation; sudo docker container rm polis-client-participation; sudo docker image build -t polis-client-participation:1.0 .
# sudo docker container run --network="host" --publish 5000:5000 --detach --name polis-client-participation polis-client-participation:1.0


ARG host=localhost
ARG port=5001

ARG static_files_host=localhost
ARG static_files_port=5001

ARG static_files_admin_host=localhost
ARG static_files_admin_port=5002

ARG postgres_host=localhost
ARG postgres_port=5432
ARG postgres_uid=postgres
ARG postgres_pwd=postgres
ARG postgres_db=polis-dev

ENV DOMAIN_OVERRIDE ${host}:${port}
ENV PORT ${port}

ENV STATIC_FILES_HOST ${static_files_host}
ENV STATIC_FILES_PORT ${static_files_port}
ENV STATIC_FILES_ADMINDASH_PORT ${static_files_admin_port}

WORKDIR /app

COPY . .

RUN npm install -g gulp && \
    npm install -g bower && \
    npm install && \
    bower install --allow-root

EXPOSE ${port}

#CMD npm start

CMD [ "node", "gulpfile.js", "default" ]


