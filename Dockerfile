FROM mhart/alpine-node
COPY . /medprices-ng
WORKDIR /medprices-ng
EXPOSE 5000
CMD serve -s build
