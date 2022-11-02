const io = require("socket.io")();

const socketapi = {
    io: io
};

let namearr = [];
let ids = [];

// Add your socket.io logic here!
io.on("connection", function (socket) {
    io.emit('onlineUsers', namearr)

    socket.on('disconnect', () => {
        let index = ids.indexOf(socket.id);
        let dname = namearr[index];
        socket.broadcast.emit('left', dname);
        namearr.splice(index, 1);
        ids.splice(index, 1);
        io.emit('onlineUsers', namearr);
    })

    socket.on('newUser', (username) => {
        namearr.push(username);
        ids.push(socket.id);
        io.emit('onlineUsers', namearr);
        socket.broadcast.emit('joined', username);
    })

    socket.on('newMessage', (data) => {
        let index = ids.indexOf(socket.id);
        let user = namearr[index];
        io.emit('newMessage', { data, user });
    });

    socket.on('typing', () => {
        let index = ids.indexOf(socket.id);
        let user = namearr[index];
        socket.broadcast.emit('typing', { user });
    });
});

module.exports = socketapi;