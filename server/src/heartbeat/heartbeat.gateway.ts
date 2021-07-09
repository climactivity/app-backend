import { Logger } from '@nestjs/common';
import { WebSocketServer, SubscribeMessage, MessageBody, WebSocketGateway, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { ChronoService } from '../chrono/chrono.service';
import { HeartbeatService } from './heartbeat.service';

// TODO move this to the heartbeat module? 
// Gateways apparently don't work if they aren't part of the app module!?

@WebSocketGateway({ path: '/heartbeat' })
export class HeartbeatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server;
  private readonly logger = new Logger(HeartbeatGateway.name);

  constructor(private readonly heartbeatService: HeartbeatService ,private readonly chronoService: ChronoService) { }

  afterInit(server: any) {
    this.logger.log(`Heartbeat-Gateway initialized, listening on {/heartbeat}`)
    this.chronoService.register(() => this.handleTick(), HeartbeatGateway.name)
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
    // console.log(`Client connected, message: ${data}`)
    let messageData = JSON.parse(data); 

    if ( typeof(messageData.type) != 'undefined' ) {
      client.send(JSON.stringify(this.heartbeatService.handleMessage(messageData)))
    }
  }

  handleTick() {
    //this.logger.verbose(`Tock`)

  }
}
