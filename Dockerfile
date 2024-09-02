FROM node:18-alpine
LABEL authors="aungmyatthu"

WORKDIR text_code_editor_frontend

COPY public/ /text_code_editor_frontend/public
COPY src/ /text_code_editor_frontend/src
COPY package.json /text_code_editor_frontend/
COPY tailwind.config.js /text_code_editor_frontend/

RUN npm install

CMD ["npm", "start"]