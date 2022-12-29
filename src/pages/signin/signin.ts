import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class SigninPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: (evt: SubmitEvent) => this.onSubmit(evt),
      onBlur: (evt: Event) => {
        const inputEl = evt.target as HTMLInputElement;
        let errorEl = inputEl.parentNode?.querySelector('.error');

        if (inputEl.id === 'email') {
          const errorEmail = validateForm([
            { type: ValidateRuleType.Email, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorEmail;
          }
        }

        if (inputEl.id === 'login') {
          const errorLogin = validateForm([
            { type: ValidateRuleType.Login, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorLogin;
          }
        }

        if (inputEl.id === 'first_name') {
          const errorFirstName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorFirstName;
          }
        }

        if (inputEl.id === 'second_name') {
          const errorSecondName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorSecondName;
          }
        }

        if (inputEl.id === 'phone') {
          const errorPhone = validateForm([
            { type: ValidateRuleType.Phone, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorPhone;
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

        if (inputEl.id === 'password_check') {
          const errorPasswordCheck = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorPasswordCheck;
          }
        }
      },
    })
  }

  onSubmit(evt: SubmitEvent) {
    evt.preventDefault();
    const emailEl = this.element?.querySelector('input[name="email"]') as HTMLInputElement;
    let emailElError = emailEl.parentNode?.querySelector('.error');
    const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement;
    let loginElError = loginEl.parentNode?.querySelector('.error');
    const firstNameEl = this.element?.querySelector('input[name="first_name"]') as HTMLInputElement;
    let firstNameElError = firstNameEl.parentNode?.querySelector('.error');
    const secondNameEl = this.element?.querySelector('input[name="second_name"]') as HTMLInputElement;
    let secondNameError = secondNameEl.parentNode?.querySelector('.error');
    const phoneEl = this.element?.querySelector('input[name="phone"]') as HTMLInputElement;
    let phoneElError = phoneEl.parentNode?.querySelector('.error');
    const passwordEl = this.element?.querySelector('input[name="password"]') as HTMLInputElement;
    let passwordError = passwordEl.parentNode?.querySelector('.error');
    const passwordCheckEl = this.element?.querySelector('input[name="password_check"]') as HTMLInputElement;
    let passwordCheckElError = passwordCheckEl.parentNode?.querySelector('.error');

    const errorEmail = validateForm([
      { type: ValidateRuleType.Email, value: emailEl.value}
    ]);

    const errorLogin = validateForm([
      { type: ValidateRuleType.Login, value: loginEl.value}
    ]);

    const errorFirstName = validateForm([
      { type: ValidateRuleType.Name, value: firstNameEl.value}
    ]);

    const errorSecondName = validateForm([
      { type: ValidateRuleType.Name, value: secondNameEl.value}
    ]);

    const errorPhone = validateForm([
      { type: ValidateRuleType.Phone, value: phoneEl.value}
    ]);

    const errorPassword = validateForm([
      { type: ValidateRuleType.Password, value: passwordEl.value},
    ]);

    let errorPasswordCheck = validateForm([
      { type: ValidateRuleType.Password, value: passwordCheckEl.value},
    ]);

    emailEl.value = emailEl.value;
    loginEl.value = loginEl.value;
    firstNameEl.value = firstNameEl.value;
    secondNameEl.value = secondNameEl.value;
    phoneEl.value = phoneEl.value;
    passwordEl.value = passwordEl.value;
    passwordCheckEl.value = passwordCheckEl.value;

    if(emailElError) {
      emailElError.textContent = errorEmail;
    }

    if(loginElError) {
      loginElError.textContent = errorLogin;
    }

    if(firstNameElError) {
      firstNameElError.textContent = errorFirstName;
    }

    if(secondNameError) {
      secondNameError.textContent = errorSecondName;
    }

    if(phoneElError) {
      phoneElError.textContent = errorPhone;
    }

    if(passwordError) {
      passwordError.textContent = errorPassword;
    }

    if(passwordCheckElError) {
      passwordCheckElError.textContent = errorPasswordCheck;
    }

    if (passwordCheckElError && passwordCheckEl.value !== passwordEl.value) {
      passwordCheckElError.textContent = "Пароли должны совпадать";
    }

    if(!errorEmail && !errorLogin && !errorFirstName && !errorSecondName && !errorPhone && !errorPassword && !errorPasswordCheck) {
      console.log(`Почта - ${emailEl.value}, Логин - ${loginEl.value}, Имя - ${firstNameEl.value}, Фамилия - ${secondNameEl.value}, Телефон - ${phoneEl.value}, Пароль - ${passwordEl.value}, Повтор пароля - ${passwordCheckEl.value}`);
      emailEl.value = '';
      loginEl.value = '';
      firstNameEl.value = '';
      secondNameEl.value = '';
      phoneEl.value = '';
      passwordEl.value = '';
      passwordCheckEl.value = '';
    }
  }

  render() {
    return `<section class="authorization">
      <div class="authorization__wrapper">
        <h2 class="authorization__title">Регистрация</h2>
        <form class="authorization__form">
          {{{InputField
            type="email"
            placeholder="pochta@yandex.ru"
            name="email"
            label="Почта"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{InputField
            type="text"
            placeholder="ivanivanov"
            name="login"
            label="Логин"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{InputField
            type="text"
            placeholder="Иван"
            name="first_name"
            label="Имя"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{InputField
            type="text"
            placeholder="Иванов"
            name="second_name"
            label="Фамилия"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{InputField
            type="tel"
            placeholder="+79099673030"
            name="phone"
            label="Телефон"
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

          {{{InputField
            type="password"
            placeholder="••••••"
            name="password_check"
            label="Пароль (ещё раз)"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{Button text="Зарегистрироваться" className="authorization__button authorization__button--signin" onClick=onSubmit}}}
          <a class="authorization__link" href="./login">Войти</a>
        </form>
      </div>
    </section>`
  }
}
