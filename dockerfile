# 为了减小包大小，此 dockerfile 中不负责构建项目，只负责运行项目
# 确保在构建项目后再运行此 dockerfile

FROM node:hydrogen-alpine

COPY ssqq.npx-web-quick-start/bin /app/bin
COPY dist /app/dist
COPY ssqq.npx-web-quick-start/package.json /app/package.json

WORKDIR /app
RUN yarn install

EXPOSE 8080
CMD node bin/index.js -- hostname=0.0.0.0 port=8080 skip-update
