FROM node:10

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN npm i
EXPOSE 3030

CMD ["npm", "start"]
