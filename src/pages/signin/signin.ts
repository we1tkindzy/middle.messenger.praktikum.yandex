import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import { register } from 'service/auth';
import queryHtmlInput from 'helpers/queryHTMLInput';

interface SigninPageProps {
  onClick?: () => void;
  onNavigate?: () => void;
}
class SigninPage extends Block {
  constructor(props: SigninPageProps) {
    super(props);

    this.setProps({
      onSubmit: (evt: SubmitEvent) => this.onSubmit(evt),
      onBlur: (evt: Event) => {
        const inputEl = evt.target as HTMLInputElement;
        const errorEl = inputEl.parentNode?.querySelector('.error');

        if (inputEl.id === 'email') {
          const errorEmail = validateForm([
            { type: ValidateRuleType.Email, value: inputEl.value },
          ]);

          if (errorEl) {
            errorEl.textContent = errorEmail;
          }
        }

        if (inputEl.id === 'login') {
          const errorLogin = validateForm([
            { type: ValidateRuleType.Login, value: inputEl.value },
          ]);

          if (errorEl) {
            errorEl.textContent = errorLogin;
          }
        }

        if (inputEl.id === 'first_name') {
          const errorFirstName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value },
          ]);

          if (errorEl) {
            errorEl.textContent = errorFirstName;
          }
        }

        if (inputEl.id === 'second_name') {
          const errorSecondName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value },
          ]);

          if (errorEl) {
            errorEl.textContent = errorSecondName;
          }
        }

        if (inputEl.id === 'phone') {
          const errorPhone = validateForm([
            { type: ValidateRuleType.Phone, value: inputEl.value },
          ]);

          if (errorEl) {
            errorEl.textContent = errorPhone;
          }
        }

        if (inputEl.id === 'password') {
          const errorPassword = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value },
          ]);

          if (errorEl) {
            errorEl.textContent = errorPassword;
          }
        }

        if (inputEl.id === 'password_check') {
          const errorPasswordCheck = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value },
          ]);

          if (errorEl) {
            errorEl.textContent = errorPasswordCheck;
          }
        }
      },
      navigateToLogin: () => this.props.router.go('/'),
    });
  }

  onSubmit(evt: SubmitEvent) {
    evt.preventDefault();
    const emailEl = queryHtmlInput(this.element, 'input[name="email"]');
    const emailElError = emailEl.parentNode?.querySelector('.error');
    const loginEl = queryHtmlInput(this.element, 'input[name="login"]');
    const loginElError = loginEl.parentNode?.querySelector('.error');
    const firstNameEl = queryHtmlInput(this.element, 'input[name="first_name"]');
    const firstNameElError = firstNameEl.parentNode?.querySelector('.error');
    const secondNameEl = queryHtmlInput(this.element, 'input[name="second_name"]');
    const secondNameError = secondNameEl.parentNode?.querySelector('.error');
    const phoneEl = queryHtmlInput(this.element, 'input[name="phone"]');
    const phoneElError = phoneEl.parentNode?.querySelector('.error');
    const passwordEl = queryHtmlInput(this.element, 'input[name="password"]');
    const passwordError = passwordEl.parentNode?.querySelector('.error');
    const passwordCheckEl = queryHtmlInput(this.element, 'input[name="password_check"]');
    const passwordCheckElError = passwordCheckEl.parentNode?.querySelector('.error');

    const errorEmail = validateForm([
      { type: ValidateRuleType.Email, value: emailEl.value },
    ]);

    const errorLogin = validateForm([
      { type: ValidateRuleType.Login, value: loginEl.value },
    ]);

    const errorFirstName = validateForm([
      { type: ValidateRuleType.Name, value: firstNameEl.value },
    ]);

    const errorSecondName = validateForm([
      { type: ValidateRuleType.Name, value: secondNameEl.value },
    ]);

    const errorPhone = validateForm([
      { type: ValidateRuleType.Phone, value: phoneEl.value },
    ]);

    const errorPassword = validateForm([
      { type: ValidateRuleType.Password, value: passwordEl.value },
    ]);

    const errorPasswordCheck = validateForm([
      { type: ValidateRuleType.Password, value: passwordCheckEl.value },
    ]);

    // emailEl.value = emailEl.value;
    // loginEl.value = loginEl.value;
    // firstNameEl.value = firstNameEl.value;
    // secondNameEl.value = secondNameEl.value;
    // phoneEl.value = phoneEl.value;
    // passwordEl.value = passwordEl.value;
    // passwordCheckEl.value = passwordCheckEl.value;

    if (emailElError) {
      emailElError.textContent = errorEmail;
    }

    if (loginElError) {
      loginElError.textContent = errorLogin;
    }

    if (firstNameElError) {
      firstNameElError.textContent = errorFirstName;
    }

    if (secondNameError) {
      secondNameError.textContent = errorSecondName;
    }

    if (phoneElError) {
      phoneElError.textContent = errorPhone;
    }

    if (passwordError) {
      passwordError.textContent = errorPassword;
    }

    if (passwordCheckElError) {
      passwordCheckElError.textContent = errorPasswordCheck;
    }

    if (passwordCheckElError && passwordCheckEl.value !== passwordEl.value) {
      passwordCheckElError.textContent = 'Пароли должны совпадать';
    }

    if (!errorEmail && !errorLogin && !errorFirstName && !errorSecondName && !errorPhone && !errorPassword && !errorPasswordCheck) {
      console.log(`Почта - ${emailEl.value}, Логин - ${loginEl.value}, Имя - ${firstNameEl.value}, Фамилия - ${secondNameEl.value}, Телефон - ${phoneEl.value}, Пароль - ${passwordEl.value}, Повтор пароля - ${passwordCheckEl.value}`);
      const registerData = {
        email: emailEl.value,
        login: loginEl.value,
        first_name: firstNameEl.value,
        second_name: secondNameEl.value,
        phone: phoneEl.value,
        password: passwordEl.value,
      };
      this.props.store.dispatch(register, registerData);
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
          {{{ InputField
            type="email"
            placeholder="pochta@yandex.ru"
            name="email"
            label="Почта"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{ InputField
            type="text"
            placeholder="ivanivanov"
            name="login"
            label="Логин"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{ InputField
            type="text"
            placeholder="Иван"
            name="first_name"
            label="Имя"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{ InputField
            type="text"
            placeholder="Иванов"
            name="second_name"
            label="Фамилия"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{ InputField
            type="tel"
            placeholder="+79099673030"
            name="phone"
            label="Телефон"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{ InputField
            type="password"
            placeholder="••••••"
            name="password"
            label="Пароль"
            className="input-field"
            onBlur=onBlur
          }}}

          {{{ InputField
            type="password"
            placeholder="••••••"
            name="password_check"
            label="Пароль (ещё раз)"
            className="input-field"
            onBlur=onBlur
          }}}

          <div class="authorization__submit-wrapper">
            {{{ Button
              text="Зарегистрироваться"
              className="authorization__button authorization__button--signin"
              onClick=onSubmit
            }}}
            {{{ Error text=formError }}}
          </div>

          {{{ Link
            text="Войти"
            className="authorization__link"
            onNavigate=navigateToLogin
          }}}
        </form>
      </div>

      {{#if ${!!window.store.getState().isLoading} }}
        {{{ Loader }}}
      {{/if}}
    </section>`;
  }
}

export default withRouter(withStore(SigninPage));
