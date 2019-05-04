FROM node:10.15.3-alpine as dependencies

WORKDIR /opt/app

COPY ./package.json /opt/app/package.json
COPY ./yarn.lock /opt/app/yarn.lock
RUN yarn

FROM dependencies as dev
COPY ./ /opt/app
ENTRYPOINT [ "yarn", "start"]

FROM dependencies as test
COPY . /opt/app
ENV CI true
RUN yarn test

FROM dependencies as build
COPY ./ /opt/app
ENV CI true
ENTRYPOINT ["yarn", "build"]

FROM build as static-web
RUN yarn build
COPY /opt/app/build /opt/site
COPY nginx /etc/nginx/conf.d
