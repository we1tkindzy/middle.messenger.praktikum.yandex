import Block from 'core/Block';

const data = [
  {
    label: "Старый пароль",
    value: "qwerty",
    type: "password",
    name: "oldPassword"
  },
  {
    label: "Новый пароль",
    value: "qwerty",
    type: "password",
    name: "newPassword"
  },
  {
    label: "Повторите новый пароль",
    value: "qwerty",
    type: "password",
    name: "newPasswordRepeat"
  },
];

export class ChangePasswordPage extends Block {
  render() {
    return `<section class="profile">
      <div class="profile__wrapper">
        {{{ BackToPage link="./profile" }}}

        <form class="profile__profile-section" action="POST">
          <div class="profile__avatar">
            <img src="./asserts/avatar-icon.svg" alt="Аватар пользоватлея" width="40" height="40">
          </div>

          <div class="profile__info">
            ${data.map((line) =>
              `<div class="profile__field">
                <label class="profile__variable" for="${line.name}">${line.label}</label>
                <input class="profile__value" type="${line.type}" id="${line.name}" name="${line.name}" value="${line.value}">
              </div>`
            ).join(' ')}
          </div>

          <button class="profile__submit" type="submit">Сохранить</button>
        </form>
      </div>
    </section>`
  }
}
