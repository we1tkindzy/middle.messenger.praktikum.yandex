import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class SigninPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: () => this.onSubmit(),
      onBlur: (evt: Event) => {
        const inputEl = evt.target as HTMLInputElement;

        if (inputEl.id === 'email') {
          const errorEmail = validateForm([
            { type: ValidateRuleType.Email, value: inputEl.value}
          ]);

          this.setProps({
            errorEmail,
            emailValue: inputEl.value,
          });
        }

        if (inputEl.id === 'login') {
          const errorLogin = validateForm([
            { type: ValidateRuleType.Login, value: inputEl.value}
          ]);

          this.setProps({
            errorLogin,
            loginValue: inputEl.value,
          });
        }

        if (inputEl.id === 'first_name') {
          const errorFirstName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value}
          ]);

          this.setProps({
            errorFirstName,
            firstNameValue: inputEl.value,
          });
        }

        if (inputEl.id === 'second_name') {
          const errorSecondName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value}
          ]);

          this.setProps({
            errorSecondName,
            secondNameValue: inputEl.value,
          });
        }

        if (inputEl.id === 'phone') {
          const errorPhone = validateForm([
            { type: ValidateRuleType.Phone, value: inputEl.value}
          ]);

          this.setProps({
            errorPhone,
            phoneValue: inputEl.value,
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

        if (inputEl.id === 'password_check') {
          const errorPasswordCheck = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value}
          ]);

          this.setProps({
            errorPasswordCheck,
            passwordCheckValue: inputEl.value,
          });
        }
      },
      emailValue: '',
      errorEmail: '',
      loginValue: '',
      errorLogin: '',
      firstNameValue: '',
      errorFirstName: '',
      secondNameValue: '',
      errorSecondName: '',
      phoneValue: '',
      errorPhone: '',
      passwordValue: '',
      errorPassword: '',
      passwordCheckValue: '',
      errorPasswordCheck: '',
    })
  }

  onSubmit() {
    const emailEl = this.element?.querySelector('input[name="email"]') as HTMLInputElement
    const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
    const firstNameEl = this.element?.querySelector('input[name="first_name"]') as HTMLInputElement
    const secondNameEl = this.element?.querySelector('input[name="second_name"]') as HTMLInputElement
    const phoneEl = this.element?.querySelector('input[name="phone"]') as HTMLInputElement
    const passwordEl = this.element?.querySelector('input[name="password"]') as HTMLInputElement
    const passwordCheckEl = this.element?.querySelector('input[name="password_check"]') as HTMLInputElement

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

    if (passwordCheckEl.value !== passwordEl.value) {
      errorPasswordCheck = "Пароли должны совпадать";
    }


    this.setProps({
      emailValue: emailEl.value,
      errorEmail,
      loginValue: loginEl.value,
      errorLogin,
      firstNameValue: firstNameEl.value,
      errorFirstName,
      secondNameValue: secondNameEl.value,
      errorSecondName,
      phoneValue: phoneEl.value,
      errorPhone,
      passwordValue: passwordEl.value,
      errorPassword,
      passwordCheckValue: passwordCheckEl.value,
      errorPasswordCheck,
    });

    if(!errorEmail && !errorLogin && !errorFirstName && !errorSecondName && !errorPhone && !errorPassword && !errorPasswordCheck) {
      console.log(`Почта - ${emailEl.value}, Логин - ${loginEl.value}, Имя - ${firstNameEl.value}, Фамилия - ${secondNameEl.value}, Телефон - ${phoneEl.value}, Пароль - ${passwordEl.value}, Повтор пароля - ${passwordCheckEl.value}`)
    }
  }

  render() {
    return `<section class="authorization">
      <div class="authorization__wrapper">
        <h2 class="authorization__title">Регистрация</h2>
        <form class="authorization__form" action="POST">
          {{{InputField
            type="email"
            placeholder="pochta@yandex.ru"
            name="email"
            label="Почта"
            value=emailValue
            className="input-field"
            ref="emailInput"
            error=errorEmail
            onBlur=onBlur
          }}}

          {{{InputField
            type="text"
            placeholder="ivanivanov"
            name="login"
            label="Логин"
            value=loginValue
            className="input-field"
            ref="loginInput"
            error=errorLogin
            onBlur=onBlur
          }}}

          {{{InputField
            type="text"
            placeholder="Иван"
            name="first_name"
            label="Имя"
            value=firstNameValue
            className="input-field"
            ref="firstNameInput"
            error=errorFirstName
            onBlur=onBlur
          }}}

          {{{InputField
            type="text"
            placeholder="Иванов"
            name="second_name"
            label="Фамилия"
            value=secondNameValue
            className="input-field"
            ref="secondNameInput"
            error=errorSecondName
            onBlur=onBlur
          }}}

          {{{InputField
            type="tel"
            placeholder="+79099673030"
            name="phone"
            label="Телефон"
            value=phoneValue
            className="input-field"
            ref="phoneInput"
            error=errorPhone
            onBlur=onBlur
          }}}

          {{{InputField
            type="password"
            placeholder="••••••"
            name="password"
            label="Пароль"
            value=passwordValue
            className="input-field"
            ref="passwordInput"
            error=errorPassword
            onBlur=onBlur
          }}}

          {{{InputField
            type="password"
            placeholder="••••••"
            name="password_check"
            label="Пароль (ещё раз)"
            value=passwordCheckValue
            className="input-field"
            ref="passwordCheckInput"
            error=errorPasswordCheck
            onBlur=onBlur
          }}}

          {{{Button text="Зарегистрироваться" className="authorization__button authorization__button--signin" onClick=onSubmit}}}
          <a class="authorization__link" href="./login">Войти</a>
        </form>
      </div>
    </section>`
  }
}
