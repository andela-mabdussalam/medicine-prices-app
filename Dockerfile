FROM node
RUN npm run build
CMD serve -s build
