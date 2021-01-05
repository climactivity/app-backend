import { Logger } from '@nestjs/common';
import { WebSocketServer, SubscribeMessage, MessageBody, WebSocketGateway, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { HeartbeatService } from './heartbeat/heartbeat.service';

// TODO move this to the heartbeat module? 
// Gateways apparently don't work if they aren't part of the app module!?

@WebSocketGateway({ path: '/heartbeat' })
export class HeartbeatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server;
  private readonly logger = new Logger(HeartbeatGateway.name);

  constructor(private readonly heartbeatService: HeartbeatService) { }

  afterInit(server: any) {
    this.logger.log(`Heartbeat-Gateway initialized, listening on {/heartbeat}`)
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.verbose(`Client connected`)
    client.send('connected');
    client.on("message", (data) => {
      this.handleMessage(data, client)
    })
  }
  handleDisconnect(client: any) {
    this.logger.verbose(`Client disconnected`)
  }

  handleMessage(data: string, client: any) {
    console.log(`Client connected, message: ${data}`)
    if (this.heartbeatService.checkVersion(JSON.parse(data))) {
      client.send(JSON.stringify({
        serverVersion: "0.1.0",
        clientSupported: true
      }));
    } else {
      client.send(JSON.stringify({
        serverVersion: "0.1.0",
        clientSupported: false
      }));
    }
  }
}
