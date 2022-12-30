import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class LoginPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: (evt: SubmitEvent) => this.onSubmit(evt),
      onBlur: (evt: Event) => {
        evt.preventDefault();
        const inputEl = evt.target as HTMLInputElement;
        let errorEl = inputEl.parentNode?.querySelector('.error');

        if (inputEl.id === 'login') {
          const errorLogin = validateForm([
            { type: ValidateRuleType.Login, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorLogin;
          }
        }

        if (inputEl.id === 'password') {
          const errorPassword = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value},
          ]);

          if(errorEl) {
            errorEl.textContent = errorPassword;
          }
        }
      },
    });
  }

  onSubmit(evt: SubmitEvent) {
    evt.preventDefault();

    const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement;
    let loginElError = loginEl.parentNode?.querySelector('.error');
    const passwordEl = this.element?.querySelector('input[name="password"]') as HTMLInputElement;
    let passwordElError = passwordEl.parentNode?.querySelector('.error');

    const errorLogin = validateForm([
      { type: ValidateRuleType.Login, value: loginEl.value}
    ]);

    const errorPassword = validateForm([
      { type: ValidateRuleType.Password, value: passwordEl.value},
    ]);

    loginEl.value = loginEl.value;
    passwordEl.value = passwordEl.value;

    if(loginElError) {
      loginElError.textContent = errorLogin;
    }

    if(passwordElError) {
      passwordElError.textContent = errorPassword;
    }

    if(!errorLogin && !errorPassword) {
      console.log(`Логин - ${loginEl.value}, Пароль - ${passwordEl.value}`);
      loginEl.value = '';
      passwordEl.value = '';
    }
  }

  render() {
    return `<section class="authorization">
      <div class="authorization__wrapper">
        <h2 class="authorization__title">Вход</h2>
        <form class="authorization__form">
        {{{InputField
          type="text"
          placeholder="ivanivanov"
          name="login"
          label="Логин"
          className="input-field"
          onBlur=onBlur
        }}}

        {{{InputField
          type="password"
          placeholder="••••••"
          name="password"
          label="Пароль"
          className="input-field"
          onBlur=onBlur
        }}}

        {{{Button text="Войти" className="authorization__button" onClick=onSubmit}}}
        <a class="authorization__link" href="./signin">Нет аккаунта?</a>
      </form>
      </div>
    </section>`
  }
}

