FROM mhart/alpine-node
COPY . /medprices-ng
WORKDIR /medprices-ng
RUN npm install -g serve
EXPOSE 5000
CMD serve -s build
