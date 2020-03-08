FROM node:6.2.0

WORKDIR /app

COPY *.json ./

RUN npm install -g gulp && \
    npm install -g bower && \
    npm install && \
    bower install --allow-root

COPY . .

EXPOSE ${port}

# CMD npm start

CMD [ "node", "gulpfile.js", "default" ]

#CMD [ "node", "./node_modules/.bin/grunt" ]


