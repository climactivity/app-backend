import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatGateway } from './heartbeat.gateway';

describe('HeartbeatGateway', () => {
  let gateway: HeartbeatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeartbeatGateway],
    }).compile();

    gateway = module.get<HeartbeatGateway>(HeartbeatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
