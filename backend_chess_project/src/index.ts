import { WebSocketServer } from 'ws';
import { Gamemanager } from './Gamemanager.js';

const wss = new WebSocketServer({ port: 8080 });
const gamemanager=new Gamemanager();

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
    gamemanager.addUser(ws)

    ws.on('disconnnect',()=> gamemanager.removeUser(ws))
    
});