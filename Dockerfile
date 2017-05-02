FROM node
COPY . /medprices-ng
WORKDIR /medprices-ng
RUN npm install
EXPOSE 5000
CMD serve -s build
