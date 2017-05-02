FROM mhart/alpine-node
COPY . /medprices-ng
WORKDIR /medprices-ng
RUN /usr/bin/node \
  --max_semi_space_size=1 \
  --max_old_space_size=198 \
  --max_executable_size=148 \
  /usr/bin/npm install
RUN npm run build
EXPOSE 5000
CMD serve -s build
