import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Erlaubt Zugriff von überall (für Entwicklung)
    }
});

io.on('connection', (socket) => {
    console.log('Ein User hat sich verbunden:', socket.id);

    // Wenn ein User eine Nachricht sendet
    socket.on('send_message', (data) => {
        // Schicke die Nachricht an ALLE verbundenen Clients
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User getrennt:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Server läuft auf Port 3001');
});