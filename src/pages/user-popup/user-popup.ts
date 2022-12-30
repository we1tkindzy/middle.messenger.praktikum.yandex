import Block from 'core/Block';

export class UserPopupPage extends Block {
  render() {
    return `<div class="user-popup">
      <div class="user-popup__wrapper">
        <h3 class="user-popup__title">Добавить пользователя</h3>
        <button class="user-popup__close">
          <svg class="file-popup__close-icon" width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4.11077" y1="4.11103" x2="11.8889" y2="11.8892" stroke="#3369F3" stroke-width="1.5"/>
            <line x1="4.11078" y1="11.8891" x2="11.889" y2="4.11093" stroke="#3369F3" stroke-width="1.5"/>
          </svg>
          <span class="visually-hidden">Закрыть</span>
        </button>

        <form class="user-popup__form" action="POST">
          {{{InputField
            type="text"
            placeholder="ivanivanov"
            name="login"
            label="Логин"
            className="input-field"
          }}}

          <button class="user-popup__submit" type="submit">Добавить</button>
        </form>
      </div>
    </div>`
  }
}
