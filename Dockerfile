FROM mhart/alpine-node
COPY . /medprices-ng
WORKDIR /medprices-ng
RUN npm install
EXPOSE 5000
CMD ./node_modules/serve/bin/serve -s build
