import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import withChats from 'utils/withChats';
import { createChat, chooseChat } from 'service/chats';
import Messages from 'service/messages';
import ProfileIcon from 'assets/dropdown-icon.svg'
import dateFormatting from 'utils/dateFormatting';

import './chats.scss'

interface ChatsPageProps {
  onSubmit?: () => void;
  onNavigate?: () => void;
}

class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);

    this.setProps({
      onSubmit: (evt: SubmitEvent) => this.onSubmit(evt),
      navigateToProfile: () => this.props.router.go('/profile'),
      onCreateChat: () => this.onCreateChat(),
      onChooseChat: (event: Event) => this.onChooseChat(event),
    });
  }

  onCreateChat() {
    const chatData = prompt('Название чата');

    if (!!chatData) {
      this.props.store.dispatch(createChat, { title: chatData });
    }
  }

  onChooseChat(event: Event) {
    const chatId = event.currentTarget!.id;
    this.props.store.dispatch(chooseChat, chatId);
  }

  getUsers(): string {
    const users = window.store.getState().users;
    const string = users.reduce((result, user, index) => `${result}${user.login}${index < users.length - 1 ? ', ' : ''}`, '');
    return string;
  }

  onSubmit(evt: any) {
    evt.preventDefault();
    const messageEl = this.element?.querySelector('input[name="message"]') as HTMLInputElement;
    let messageElError = messageEl.parentNode?.querySelector('.error');

    const errormessage = validateForm([
      { type: ValidateRuleType.Message, value: messageEl.value}
    ]);

    messageEl.value = messageEl.value;

    if(messageElError) {
      messageElError.textContent = errormessage;
    }

    if(!errormessage) {
      console.log(`Сообщение: ${messageEl.value}`);
      Messages.sendMessage(messageEl.value);
      messageEl.value = '';
    }
  }

  render() {
    if (this.props.chats === 'undefined') {
      return `{{{ Loader }}}`;
    }

    return `<section class="chats-page">
      <div class="chats-page__wrapper">
        <div class="chats-page__content">
          <div class="chats-page__buttons">
            {{{ Button
              text="Новый чат"
              className="chats-page__new-chat"
              onClick=onCreateChat
            }}}

            {{{ Button
              text="Профиль"
              svg="${ProfileIcon}"
              className="chats-page__profile"
              onNavigate=navigateToProfile
            }}}
          </div>

          <label class="visually-hidden" for="search">Поиск</label>
          <input class="chats-page__search" type="text" id="search" name="search" placeholder="Поиск">

          {{#if ${!!this.props.chats} }}
            <ul class="chats">
              ${this.props.chats?.map((chat: Chat) => `{{{ Chat
                name="${chat.title}"
                date="${dateFormatting(chat.last_message!?.time)}"
                message="${chat.last_message?.content}"
                messages="${chat.unread_count}"
                onClick=onChooseChat
                id="${chat.id}"
              }}}`).join(" ")}
            </ul>
          {{else}}
            <p class="chats__no-chats">Нет чатов</p>
          {{/if}}
        </div>


        {{#if ${window.store.getState().chatId !== null} }}
          {{{ ChatSection
            name="${window.store.getState().chatTitle}"
            users="${this.getUsers()}"
            onSubmit=onSubmit
          }}}
        {{else}}
          <div class="chats-page__chat-section chat-section">
            <p class="chat-section__info">Выберите чат чтобы отправить сообщение</p>
          </div>
        {{/if}}
      </div>

      {{#if ${!!window.store.getState().isLoading} }}
        {{{ Loader }}}
      {{/if}}
    </section>`;
  }
}

export default withRouter(withStore(withChats(ChatsPage)));
