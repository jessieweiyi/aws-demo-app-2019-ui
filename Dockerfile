FROM node:10.15.3-alpine as dependencies

WORKDIR /opt/app

COPY ./package.json /opt/app/package.json
COPY ./yarn.lock /opt/app/yarn.lock
RUN yarn

FROM dependencies as build
COPY ./ /opt/app
ENV CI true
RUN yarn build

FROM dependencies as dev
COPY ./ /opt/app
ENTRYPOINT [ "yarn", "start"]

FROM dependencies as test
COPY . /opt/app
ENV CI true
RUN  yarn test

FROM nginx:1.16-alpine as static-web
COPY --from=build /opt/app/build /opt/site
COPY nginx /etc/nginx/conf.d
