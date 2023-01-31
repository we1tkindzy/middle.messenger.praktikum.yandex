import Block from 'core/Block';
import * as ArrowIcon from 'assets/arrow-icon.svg';
import * as ClipIcon from 'assets/clip-icon.svg';

import './messageForm.scss'

interface MessageFormProps {
  onSubmit?: () => void;
}

class MessageForm extends Block {
  static componentName = "MessageForm";

  constructor({onSubmit}: MessageFormProps) {
    super({events: {submit: onSubmit}});
  }

  render() {
    return `<form class="chat-section__form" id="form">
      {{{ Button
        className="chat-section__clip"
        svg="${ClipIcon}"
        alt="Прикрепить файл"
      }}}

      {{{ InputField
        type="text"
        placeholder="Сообщение"
        name="message"
        value=messageValue
        className="chat-section-input"
        ref="messageInput"
        error=errorMessage
      }}}

      {{{ Button
        className="chat-section__submit"
        svg="${ArrowIcon}"
        alt="Отправить сообщение"
      }}}
    </form>`;
  }
}

export default MessageForm;
