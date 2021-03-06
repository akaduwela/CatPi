const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Gpio = require('onoff').Gpio;
const LEDPin = new Gpio(17, 'out');


server.listen(3000, () => console.log('CatPi app listening on port 3000'));
app.use(express.static('node_modules'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log("Connected successfully to the socket ...");

    socket.on('state', function (data) {
	buttonState = data;
	if(buttonState != LEDPin.readSync()) {
	    LEDPin.writeSync(buttonState);
	}
    });
});
      
