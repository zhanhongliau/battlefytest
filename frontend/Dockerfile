FROM node:10

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN npm i
RUN npm i serve

EXPOSE 3000

CMD ["npm", "start"]
