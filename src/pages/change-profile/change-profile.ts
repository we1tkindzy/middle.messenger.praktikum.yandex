import Block from 'core/Block';

const data = [
  {
    label: "Почта",
    value: "pochta@yandex.ru",
    type: "email",
    name: "email"
  },
  {
    label: "Логин",
    value: "ivanivanov",
    type: "text",
    name: "login"
  },
  {
    label: "Имя",
    value: "Иван",
    type: "text",
    name: "first_name"
  },
  {
    label: "Фамилия",
    value: "Иванов",
    type: "text",
    name: "second_name"
  },
  {
    label: "Имя в чате",
    value: "Иван",
    type: "text",
    name: "display_name"
  },
  {
    label: "Телефон",
    value: "+7 (909) 967 30 30",
    type: "tel",
    name: "phone"
  },
];

export class ChangeProfilePage extends Block {
  render() {
    return `<section class="profile profile--change">
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
