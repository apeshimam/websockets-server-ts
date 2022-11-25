import { WebSocketServer, WebSocket } from "ws"
import * as Automerge from "@automerge/automerge"

const port = 3000

const wss = new WebSocketServer({port})
const clients = new Set<WebSocket>

type D = { 
    text: Automerge.Text
}

var document: Automerge.Doc<D>
var syncState: Automerge.SyncState

wss.on('connection', ws => {
    clients.add(ws)
    ws.on('message', msg => {
        console.log('Received message from client', msg)
        clients.forEach( client => {
            if(client != ws && client.readyState == WebSocket.OPEN)
                client.send(msg)
        })
    })
})

console.log("Listening on ", port)