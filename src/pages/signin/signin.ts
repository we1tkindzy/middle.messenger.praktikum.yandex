import Block from 'core/Block';

const data = [
  {
    name: "email",
    label: "Почта",
    type: "email",
    placeholder: "pochta@yandex.ru"
  },
  {
    name: "login",
    label: "Логин",
    type: "text",
    placeholder: "ivanivanov"
  },
  {
    name: "first_name",
    label: "Имя",
    type: "text",
    placeholder: "Иван"
  },
  {
    name: "second_name",
    label: "Фамилия",
    type: "text",
    placeholder: "Иванов"
  },
  {
    name: "phone",
    label: "Телефон",
    type: "tel",
    placeholder: "+7(909)9673030"
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "••••••"
  },
  {
    name: "password_check",
    label: "Пароль (ещё раз)",
    type: "password",
    placeholder: "••••••"
  }
];

export class SigninPage extends Block {
  render() {
    return `<section class="authorization">
      <div class="authorization__wrapper">
        <h2 class="authorization__title">Регистрация</h2>
        <form class="authorization__form" action="POST">
          ${data.map((input) =>
            `{{{ InputField
              type="${input.type}"
              placeholder="${input.placeholder}"
              name="${input.name}"
              label="${input.label}"
            }}}`
          ).join(' ')}

          <button class="authorization__button authorization__button--signin" type="submit">Зарегистрироваться</button>
          <a class="authorization__link" href="./login">Войти</a>
        </form>
      </div>
    </section>`
  }
}
