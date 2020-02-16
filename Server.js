var net = require('net');
var HOST = '127.0.0.1';
var PORT = 8000;

var names = [];
var scores = [];

net.createServer(function(sock) {
    var firstTime = true;
    var index = 0;

    console.log('CONNECTED');

    sock.on('data', function(data) {
        var input = data.toString();

        if(isNaN(parseInt(input))) {
            if(names.length == 0) {
                names.push(input);
                scores.push(0);
                firstTime = false;
            }
            else {
                for(var i = 0; i < names.length; i++) {
                    if(!input.localeCompare(names[i])) {
                        index = i;
                        firstTime = false;
                    }
                }    
                names.push(input);
                scores.push(0);
                index = names.length - 1;
                firstTime = false;
                   
            }
            sock.write("OK");
        }

        else {
            if(firstTime) {
                sock.destroy();
            }
            else {
                scores[index] += parseInt(input);
                sock.write(scores[index].toString());
            }
        }
    });

    sock.on('close', function(data) {
        console.log('CLOSED');
    });

}).listen(PORT, HOST);