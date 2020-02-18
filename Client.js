var net = require('net');
var HOST = '127.0.0.1';
var PORT = 8000;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
var client = new net.Socket();

client.connect(PORT, HOST, function() {
    console.log('CONNECTED');
    rl.question('Who are you: ', (answer) => {
        client.write(answer);
    });
});

client.on('data', function(data) {
    console.log(data.toString());
    rl.question('DATA: ', (answer) => {
        client.write(answer);
    });
});

client.on('close', function() {
    console.log('CLOSED');
});