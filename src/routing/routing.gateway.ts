import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const BIG_SCREEN = 'big-screen';
const SMALL_SCREEN = 'small-screen';

const EVENT_KEY_SMALL_SCREEN = {
  CHANGE_ACTIVE: 'change-active',
  CHANGE_IDLE: 'change-idle',
  CHANGE_LOGIN: 'change-login',
  CHANGE_SESSION: 'change-session',
};

const EVENT_KEY_BIG_SCREEN = {
  CHANGE_ACTIVE: 'change-active',
  CHANGE_IDLE: 'change-idle',
  CHANGE_LOGIN: 'change-login',
  CHANGE_SESSION: 'change-session',
  MOVE_TO_SELECT_LITE_FULL: 'move-to-select-lite-full',
  MOVE_TO_SELECT_MODE: 'move-to-select-mode',
  MOVE_TO_SELECT_SESSION: 'move-to-select-session',
  STOP_SESSION: 'stop-session',
  START_SESSION: 'start-session',
  CHANGE_DURATION_SESSION: 'change-duration-session',
};

const ACTION_KEY_BIG_SCREEN = {
  SET_ACTIVE: 'set-active',
  SET_ON_IDLE: 'set-on-idle',
  SET_ON_SESSION: 'set-on-session',
};

const ACTION_KEY_SMALL_SCREEN = {
  SET_ACTIVE: 'set-active',
  SET_ON_IDLE: 'set-on-idle',
  SET_ON_LOGIN: 'set-on-login',
  STOP_SESSION: 'stop-session',
  START_SESSION: 'start-session',
  CHANGE_DURATION_SESSION: 'change-duration-session',
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoutingGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('Client connected: ' + client.id);
  }

  @SubscribeMessage('big-screen-action')
  handleBigScreenAction(@MessageBody() payload: any) {
    console.log('big-screen-action', payload);
    const { action, data } = payload;
    switch (action) {
      case ACTION_KEY_BIG_SCREEN.SET_ACTIVE:
        console.log('set-active');
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.CHANGE_ACTIVE,
          data: null,
        });
        this.server.emit(SMALL_SCREEN, {
          event: EVENT_KEY_SMALL_SCREEN.CHANGE_ACTIVE,
          data: null,
        });
        break;
      case ACTION_KEY_BIG_SCREEN.SET_ON_SESSION:
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.CHANGE_SESSION,
          data: null,
        });
        this.server.emit(SMALL_SCREEN, {
          event: EVENT_KEY_SMALL_SCREEN.CHANGE_SESSION,
          data: null,
        });
        break;
      default:
        break;
    }
  }

  @SubscribeMessage('small-screen-action')
  handleSmallScreenAction(@MessageBody() payload: any) {
    console.log('small-screen-action', payload);
    const { action, data } = payload;
    switch (action) {
      case ACTION_KEY_SMALL_SCREEN.SET_ACTIVE:
        console.log('set-active');
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.CHANGE_ACTIVE,
          data: null,
        });
        this.server.emit(SMALL_SCREEN, {
          event: EVENT_KEY_SMALL_SCREEN.CHANGE_ACTIVE,
          data: null,
        });
        break;
      case ACTION_KEY_SMALL_SCREEN.SET_ON_LOGIN:
        console.log('set-on-login');
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.CHANGE_LOGIN,
          data: null,
        });
        this.server.emit(SMALL_SCREEN, {
          event: EVENT_KEY_SMALL_SCREEN.CHANGE_LOGIN,
          data: null,
        });
        break;
      case ACTION_KEY_SMALL_SCREEN.SET_ON_IDLE:
        this.server.emit(SMALL_SCREEN, {
          event: EVENT_KEY_SMALL_SCREEN.CHANGE_IDLE,
          data: null,
        });
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.CHANGE_IDLE,
          data: null,
        });
        break;
      case ACTION_KEY_SMALL_SCREEN.START_SESSION:
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.START_SESSION,
          data: null,
        })
        break;
      case ACTION_KEY_SMALL_SCREEN.STOP_SESSION:
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.STOP_SESSION,
          data: null,
        })
        break;
      case ACTION_KEY_SMALL_SCREEN.CHANGE_DURATION_SESSION:
        this.server.emit(BIG_SCREEN, {
          event: EVENT_KEY_BIG_SCREEN.CHANGE_DURATION_SESSION,
          data: data,
        })
        break;
      default:
        break;
    }
  }
}
