FROM mhart/alpine-node
COPY . /medprices-ng
WORKDIR /medprices-ng
RUN npm install && npm run build
CMD serve -s build
