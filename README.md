# Client deploy steps

__Nuts & bolts__ 

```
git clone https://github.com/SterlingAr/client-kampai.git

#install dependencies
npm install --save
#run in memory for development
npm run dev
#build project for production, files stored at dist/ and can only be served through http.
npm run build
```
__In src/store/store.js change:__

>         api_base_uri: 'https://api.your-local-server.com/',


__Note:__

This project works in conjunction with [Kampai](https://github.com/SterlingAr/kampai)
