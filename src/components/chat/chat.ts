import Block from 'core/Block';
import EmptyAvatarImg from 'assets/empty-avatar.png';

import './chat.scss';

interface ChatProps {
  name: string;
  date?: string;
  message?: string;
  messages?: string;
  onClick?: () => void;
  id: string;
}

class Chat extends Block {
  static componentName = 'Chat';

  constructor({
    id,
    name,
    date,
    message,
    messages,
    onClick,
  }: ChatProps) {
    super({
      id,
      name,
      date,
      message,
      messages,
      events: {
        click: onClick,
      },
    });
  }

  render() {
    return `<li class="chat__item" id={{id}}>
      <div class="chat__img">
        <img src="${EmptyAvatarImg}" alt="Аватар" width="47" height="47">
      </div>
      <div class="chat__info">
        <div class="chat__mesh">
          <p class="chat__name">{{name}}</p>
          {{#if ${this.props.message !== 'undefined'} }}
            <p class="chat__time">{{date}}</p>
          {{/if}}
        </div>

        {{#if ${this.props.message !== 'undefined'} }}
          <p class="chat__text">{{message}}</p>
          {{#if ${this.props.messages !== '0'} }}
            <div class="chat__alert">{{messages}}</div>
          {{/if}}
        {{else}}
          <p class="chat__text">Нет сообщений</p>
        {{/if}}
      </div>
    </div>`;
  }
}

export default Chat;
