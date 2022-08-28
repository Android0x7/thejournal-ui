FROM node:alpine as build
WORKDIR /app
EXPOSE 3000
RUN npm install -g serve
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run build
RUN mv build /webapp
RUN rm -r /app

FROM build as final
WORKDIR /webapp
#COPY --from=build /publish .
CMD [ "serve", "-s" ]
