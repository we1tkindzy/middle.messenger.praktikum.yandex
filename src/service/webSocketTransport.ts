import EventBus from "core/EventBus";

export const EVENTS = {
  OPEN: 'open',
  CLOSE: 'close',
  ERROR: 'error',
  MESSAGE: 'message',
} as const;

export class WebSocketTransport extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval = 30000;

  constructor(private url: string) {
    super();
    this.url = url;
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);
    this.listenEvents(this.socket);

    this.ping();

    return new Promise((resolve, reject) => {
      this.on(EVENTS.OPEN, () => resolve());
      this.on(EVENTS.CLOSE, () => reject());
    });
  }

  public send(data: unknown): void {
    if (!this.socket) {
      throw new Error('Сокет не подключен');
    }

    this.socket.send(JSON.stringify(data));
  }

  public close(): void {
    this.socket?.close();
  }

  ping(): void {
    const ping = setInterval(() => this.send({ type: 'ping' }), this.pingInterval);

    this.on(EVENTS.CLOSE, () => {
      clearInterval(ping);
      this.pingInterval = 0;
    });
  }

  private listenEvents(socket: WebSocket): void {
    socket.addEventListener('open', () => this.emit(EVENTS.OPEN));

    socket.addEventListener('close', () => this.emit(EVENTS.CLOSE));

    socket.addEventListener('error', error => this.emit(EVENTS.ERROR, error));

    socket.addEventListener('message', message => {
      try {
        const data = JSON.parse(message.data);

        if ((data.type && data.type === 'pong') || (data.type === 'user connected')) {
          return;
        }

        this.emit(EVENTS.MESSAGE, data);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
