FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html/baker-blade
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

# Health check every 10 minutes (600s)
HEALTHCHECK --interval=600s --timeout=5s --retries=3 \
  CMD wget --spider -q http://localhost/baker-blade/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
