import { Test, TestingModule } from '@nestjs/testing';
import { RoutingGateway } from './routing.gateway';

describe('RoutingGateway', () => {
  let gateway: RoutingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutingGateway],
    }).compile();

    gateway = module.get<RoutingGateway>(RoutingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
