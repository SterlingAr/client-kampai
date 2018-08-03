# Client deploy steps

__Nuts & bolts__ 

__Live project at: https://marius-cv.com__

```
git clone https://github.com/SterlingAr/client-kampai.git

#install dependencies
npm install --save
#run in memory for development
npm run dev

#build project for production and use docker to serve them through http. 
npm run build 
cd docker 
docker-compose up -d caddy 
```


This project works in conjunction with [Kampai](https://github.com/SterlingAr/kampai) 
Currently its using the API at https://api-kampai.marius-cv.com, however if you deploy your own API, you can change the API route in this project like so: 

__In src/store/store.js change:__

>         api_base_uri: 'http://api.your-local-server.com/',

__Note:__

Some features like user location only work through HTTPS, so make sure you use a SSL certificate. 


