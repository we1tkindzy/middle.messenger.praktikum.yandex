import Block from 'core/Block';
import './message.scss';

interface MessageProps {
  className?: String;
  name?: String;
  content?: String;
  date?: String;
}

class Message extends Block {
  static componentName = 'Message';

  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return `<div class="chat-section__message {{className}}">
      {{#if ${!!this.props.name} }}
        <div class="chat-section__name">{{name}}</div>
      {{/if}}

      <div>
        <p class="chat-section__text">{{content}}</p>
        <p class="chat-section__time">{{date}}</p>
      </div>
    </div>`;
  }
}

export default Message;
