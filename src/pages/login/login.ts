import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class LoginPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: () => this.onSubmit(),
      onBlur: (evt: Event) => {
        const inputEl = evt.target as HTMLInputElement;

        if (inputEl.id === 'login') {

          const errorLogin = validateForm([
            { type: ValidateRuleType.Login, value: inputEl.value}
          ]);

          this.setProps({
            errorLogin,
            loginValue: inputEl.value,
          });
        }

        if (inputEl.id === 'password') {
          const errorPassword = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value},
          ]);

          this.setProps({
            errorPassword,
            passwordValue: inputEl.value,
          });
        }
      },
      loginValue: '',
      errorLogin: '',
      passwordValue: '',
      errorPassword: '',
    })
  }

  onSubmit() {
    const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
    const passwordEl = this.element?.querySelector('input[name="password"]') as HTMLInputElement

    const errorLogin = validateForm([
      { type: ValidateRuleType.Login, value: loginEl.value}
    ]);

    const errorPassword = validateForm([
      { type: ValidateRuleType.Password, value: passwordEl.value},
    ]);


    this.setProps({
      errorLogin: errorLogin,
      errorPassword: errorPassword,
      loginValue: loginEl.value,
      passwordValue: passwordEl.value,
    });

    if(!errorLogin && !errorPassword) {
      console.log(`Логин - ${loginEl.value}, Пароль - ${passwordEl.value}`)
    }
  }

  render() {
    return `
    <section class="authorization">
      <div class="authorization__wrapper">
        <h2 class="authorization__title">Вход</h2>
        <form class="authorization__form" action="POST">
          {{{InputField
            type="text"
            placeholder="ivanivanov"
            name="login"
            label="Логин"
            value=loginValue
            className="input-field"
            onBlur=onBlur
            ref="loginInput"
            error=errorLogin
          }}}

          {{{InputField
            type="password"
            placeholder="••••••"
            name="password"
            label="Пароль"
            value=passwordValue
            className="input-field"
            onBlur=onBlur
            error=errorPassword
          }}}

          {{{Button text="Войти" className="authorization__button" onClick=onSubmit}}}
          <a class="authorization__link" href="./signin">Нет аккаунта?</a>
        </form>
      </div>
    </section>
    `
  }
}
