'''#!/usr/bin/env python'''
#!/usr/bin/python

import asyncore
from websocket import WebSocketServer

class BroadcastHandler(object):
    """
    The BroadcastHandler repeats incoming strings to every connected
    WebSocket.
    """

    def __init__(self, conn):
        self.conn = conn

    def dispatch(self, data):
        for session in self.conn.server.sessions:
            session.send(data)


if __name__ == "__main__":
    print "Starting WebSocket broadcast server - ws://localhost:8080/broadcast"
    WebSocketServer(port=8080, handlers={"/broadcast": BroadcastHandler})
    asyncore.loop()
