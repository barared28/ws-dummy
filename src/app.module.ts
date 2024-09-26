import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutingGateway } from './routing/routing.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RoutingGateway],
})
export class AppModule {}
