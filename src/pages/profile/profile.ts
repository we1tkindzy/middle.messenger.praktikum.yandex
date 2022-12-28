import Block from 'core/Block';

const data = [
  {
    variable: "Почта",
    value: "pochta@yandex.ru",
  },
  {
    variable: "Логин",
    value: "ivanivanov",
  },
  {
    variable: "Имя",
    value: "Иван",
  },
  {
    variable: "Фамилия",
    value: "Иванов",
  },
  {
    variable: "Имя в чате",
    value: "Иван",
  },
  {
    variable: "Телефон",
    value: "+7 (909) 967 30 30",
  },
];

export class ProfilePage extends Block {
  render() {
    return `<section class="profile">
      <div class="profile__wrapper">
        {{{ BackToPage link="./select-chat" }}}

        <div class="profile__profile-section">
          <div class="profile__avatar">
            <img src="../avatar-icon.svg" alt="Аватар пользоватлея" width="40" height="40">
          </div>

          <h3 class="profile__name">Иван</h3>

          <div class="profile__info">
            ${data.map((line) =>
              `<div class="profile-field">
                <span class="profile-field__label">${line.variable}</span>
                <span class="profile-field__input">${line.value}</span>
              </div>`
            ).join(' ')}
          </div>

          <a class="profile__cahnge-profile" href="./change-profile">Изменить данные</a>
          <a class="profile__cahnge-password" href="./change-password">Изменить пароль</a>
          <button class="profile__logout" type="button">Выйти</button>
        </div>
      </div>
    </section>`
  }
}
