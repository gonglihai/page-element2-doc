## 本地运行
``` shell
npm run docs:dev
```

## 打包静态文件
``` shell
npm run docs:build
```

## 部署 Nginx 配置
``` nginx
server {
   listen 80;
   server_name page-element2.glh.red;
   rewrite ^(.*) https://$server_name$request_uri permanent;
}

server {
    listen 443 ssl;
    server_name page-element2.glh.red;
    ssl_certificate /etc/nginx/ssl/page-element2.glh.red.cert.pem;
    ssl_certificate_key /etc/nginx/ssl/page-element2.glh.red.key.pem;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;

    location / {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
        add_header Access-Control-Allow-Headers 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Method';
        add_header Access-Control-Max-Age 3600;

        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
            add_header Access-Control-Allow-Headers 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Method';
            add_header Access-Control-Max-Age 3600;
            return 204;
        }

        root /root/home/workspase/page-element2/dist;
        index index.html;
    }
}
```