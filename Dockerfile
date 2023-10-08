# base image
FROM node:10
#set working directory

WORKDIR /app

#add /app/node_modules/.bin to $PATH

ENV PATH /app/node_modules/.bin:$PATH

#install and cache app dependencies

#COPY package.json /app/package.json
COPY . /app

RUN npm install

#RUN npm install webpack@4.39.3 --save

RUN npm install @vue/cli@4.5.15 -g
# generate build
#RUN npm run build

EXPOSE 9099
#start app
#
CMD ["npm", "run", "serve"]
