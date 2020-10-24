# sse_sample
sse sample

## usage
```
npm install
node index.js
```

## sse
### URL
/information
### event
|event|desc|
|---|---|
|message|(nothing)|
|notification|GET /notify|
|USDJPY|USD/JPY dummy rate|
|GBPUSD|GBP/USD dummy rate|

## sample page
/sample.html

## docker
```
docker pull nagaomao/sse_sample_server
docker run -p 3000:8080 -d nagaomao/sse_sample_server
curl http://localhost:3000/information
```
