import Block from 'core/Block';
import EmptyAvatarImg from 'assets/empty-avatar.png';
import MoreIcon from 'assets/more-icon.svg';
import { addUser, deleteChat, deleteUser } from 'service/chats';
import dateFormatting from 'helpers/dateFormatting';

import './chatSection.scss';

interface ChatSectionProps {
  name: string;
  users: string;
  onSubmit?: () => void;
}

class ChatSection extends Block {
  static componentName = 'ChatSection';

  static allChatUsers: Array<User>;

  constructor({ name, users, onSubmit }: ChatSectionProps) {
    super({ name, users, onSubmit });

    this.setProps({
      showMoreMenu: () => this.showMoreMenu(),
      onDeleteChat: () => this.onDeleteChat(),
      onAddUser: () => this.onAddUser(),
      onDeleteUser: () => this.onDeleteUser(),
    });

    ChatSection.allChatUsers = window.store.getState().users;
  }

  getMessageUser(id: number): string {
    let messageUser;
    if (!!ChatSection.allChatUsers) messageUser = ChatSection.allChatUsers.find(user => user.id === id)!.login;
    else messageUser = '';

    return messageUser;
  }

  showMoreMenu() {
    const menu = document.querySelector('.chat-section__links');
    menu!.classList.toggle('chat-section__links--active');
  }

  onAddUser() {
    const chatId = window.store.getState().chatId;
    const login = prompt('Добавить пользователя (логин)');

    if (!!login) {
      window.store.dispatch(addUser, { user: login, chatId });
    }
  }

  onDeleteUser() {
    const chatId = window.store.getState().chatId;
    const login = prompt('Удалить пользователя (логин)');

    if (!!login) {
      window.store.dispatch(deleteUser, { user: login, chatId });
    }
  }

  onDeleteChat() {
    const chatId = window.store.getState().chatId;
    window.store.dispatch(deleteChat, chatId);
  }

  render() {
    return `<div class="chats-page__chat-section chat-section">
      <div class="chat-section__wrapper">
        <div class="chat-section__container">
          <div class="chat-section__group">
            <div class="chat-section__avatar-img">
              <img src="${EmptyAvatarImg}" alt="Аватар беседы" width="34" height="34">
            </div>
            <div class="chat-section__group-info">
              <h3 class="chat-section__group-name">{{name}}</h3>
              <span class="chat-section__users">{{users}}</span>
            </div>
          </div>

          <div class="chat-section__menu">
            {{{ Button
              svg="${MoreIcon}"
              alt="Меню чата"
              className="chat-section__more"
              onClick=showMoreMenu
            }}}

            <div class="chat-section__links">
              <ul class="chat-section__links-list">
                <li class="chat-section__links-item">
                  {{{ Button
                    text="Добавить пользователя"
                    className="chat-section__link"
                    onClick=onAddUser
                  }}}
                </li>

                <li class="chat-section__links-item">
                  {{{ Button
                    text="Удалить пользователя"
                    className="chat-section__link"
                    onClick=onDeleteUser
                  }}}
                </li>

                <li class="chat-section__links-item">
                  {{{ Button
                    text="Удалить чат"
                    className="chat-section__link"
                    onClick=onDeleteChat
                  }}}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="chat-section__field" id="messages">
          ${window.store.getState().messages.map(el => `
            {{#if ${window.store.getState().user?.id === el.user_id} }}
              {{{ Message
                className="chat-section__message--my-message"
                content="${el.content}"
                date="${dateFormatting(el.time)}"
              }}}
            {{else}}
              {{{ Message
                name="${this.getMessageUser(el.user_id)}"
                content="${el.content}"
                date="${dateFormatting(el.time)}"
              }}}
            {{/if}}
          `).join(' ')}
        </div>

        {{{ MessageForm
          onSubmit=onSubmit
        }}}
      </div>
    </div>`;
  }
}

export default ChatSection;
