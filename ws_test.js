const WebSocket = require('ws');
 
const ws = new WebSocket('wss://blog.mcloudhub.com', {
  origin: 'https://blog.mcloudhub.com'
});
 
ws.on('open', open => {
  console.log('connected');
  ws.send(Date.now());
});
 
ws.on('close', close => {
  console.log('disconnected');
});
 
ws.on('message', function incoming(data) {
	console.log(data);
  console.log(`Roundtrip time: ${Date.now() - data} ms`);
 
  // setTimeout(function timeout() {
  //   ws.send(Date.now());
  // }, 500);
});