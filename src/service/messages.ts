import { WebSocketTransport, EVENTS } from './webSocketTransport';

class Messages {
  private socket!: WebSocketTransport;

  private sockets: { [id: string]: WebSocketTransport } = {};

  public async connect(chatId: number, token: string, start: string = '0'): Promise<void> {
    try {
      this.close();

      const userId = window.store.getState().user!.id;
      this.socket = new WebSocketTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

      await this.socket.connect();

      this.sockets[chatId] = this.socket;
      this.socket.on(EVENTS.MESSAGE, message => this.storeMessages(message));
      this.socket.on(EVENTS.CLOSE, () => this.close());

      this.socket.send({ type: 'get old', content: start });
    } catch (err) {
      console.error(err);
    }
  }

  public sendMessage(content: string): void {
    this.socket.send({
      content,
      type: 'message',
    });
  }

  private async storeMessages(messagesData: Message | Array<Message>): Promise<void> {
    let newMessages: Array<Message> = [];

    if (Array.isArray(messagesData)) {
      newMessages = messagesData.reverse();
    } else {
      newMessages.push(messagesData);
    }

    const currentMessages = window.store.getState().messages;
    currentMessages.push(messagesData as Message);

    window.store.dispatch({ messages: currentMessages.flat() });
  }

  public close(): void {
    const sockets = Object.keys(this.sockets);
    if (sockets.length) {
      sockets.forEach((id: string) => {
        this.sockets[id].close();
        delete this.sockets[id];

        window.store.dispatch({ messages: [] });
      });
    }
  }
}

export default new Messages();
