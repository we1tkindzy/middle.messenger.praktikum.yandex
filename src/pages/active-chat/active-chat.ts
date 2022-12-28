import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class ActiveChatPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: () => this.onSubmit(),
      messageValue: '',
      errormessage: '',
    })
  }

  onSubmit() {
    const messageEl = this.element?.querySelector('input[name="message"]') as HTMLInputElement;

    const errormessage = validateForm([
      { type: ValidateRuleType.Message, value: messageEl.value}
    ]);


    this.setProps({
      messageValue: messageEl.value,
      errormessage,
    });

    if(!errormessage) {
      console.log(`Сообщение: ${messageEl.value}`)
    }
  }

  render() {
    return `<div class="chats-page">
      <div class="chats-page__wrapper">
        {{{Chats}}}

        <div class="chats-page__chat-section chat-section">
          <div class="chat-section__wrapper">
            <div class="chat-section__container">
              <div class="chat-section__profile-info">
                <div class="chat-section__avatar-img">
                  <img src="../empty-avatar.png" alt="Аватар" width="34" height="34">
                </div>
                <h3 class="chat-section__name">Вадим</h3>
              </div>

              <button class="chat-section__more">
                <svg class="chat-section__icon" width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                  <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                  <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                </svg>
                <span class="visually-hidden">Доп. информация</span>
              </button>
            </div>

            <span class="chat-section__date">19 июня</span>

            <div class="chat-section__messages">
              <div class="chat-section__message">
                <p class="chat-section__text">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

                  Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                </p>
                <span class="chat-section__time">11:56</span>
              </div>

              <div class="chat-section__message chat-section__message--photo">
                <div class="chat-section__img">
                  <img src="../swc.png" alt="SWC камера" width="316" height="211">
                </div>
                <span class="chat-section__time chat-section__time">11:56</span>
              </div>

              <div class="chat-section__message chat-section__message--my-message">
                <p class="chat-section__text">
                  Круто!
                </p>
                <span class="chat-section__time">12:00</span>
              </div>
            </div>

            <form class="chat-section__form" action="">
              <button class="chat-section__clip">
                <svg class="chat-section__clip-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" fill="#999999"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" fill="#999999"/>
                </svg>
                <span class="visually-hidden">Прикрепить файл</span>
              </button>

              {{{InputField
                type="text"
                placeholder="Сообщение"
                name="message"
                value=messageValue
                className="chat-section-input"
                ref="messageInput"
                error=errorMessage
              }}}

              {{{Button
                className="chat-section__submit"
                svg="true"
                onClick=onSubmit
              }}}
            </form>
          </div>
        </div>
      </div>
    </div>`
  }
}


