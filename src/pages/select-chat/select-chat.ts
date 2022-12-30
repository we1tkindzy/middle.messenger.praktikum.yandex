import Block from 'core/Block';

export class SelectChatPage extends Block {
  render() {
    return `<div class="chats-page">
      <div class="chats-page__wrapper">
        {{{Chats}}}

        <div class="chats-page__chat-section chat-section">
          <p class="chat-section__info">Выберите чат чтобы отправить сообщение</p>
        </div>
      </div>
    </div>`
  }
}
