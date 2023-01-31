import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import { login } from 'service/auth';

type LoginPageProps = {
  onNavigate?: () => void;
  onSubmit?: (evt: SubmitEvent) => void;
  onBlur?: (evt: Event) => void;
};

class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super(props)

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
      onNavigateToSignin: () => this.props.router.go('/signin'),
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
      const loginData = {
        login: loginEl.value,
        password: passwordEl.value,
      };
      this.props.store.dispatch(login, loginData);
      loginEl.value = '';
      passwordEl.value = '';
    }
  }

  render() {
    return `<section class="authorization">
      <div class="authorization__wrapper">
        <h2 class="authorization__title">Вход</h2>
        <form class="authorization__form">
          {{{ InputField
            type="text"
            placeholder="ivanivanov"
            name="login"
            label="Логин"
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

          {{{ Button
            text="Войти"
            className="authorization__button"
            onClick=onSubmit
          }}}
          {{{ Button
            text="Нет аккаунта?"
            className="authorization__link"
            onNavigate=onNavigateToSignin
          }}}
        </form>
      </div>

      {{#if ${!!window.store.getState().isLoading} }}
        {{{ Loader }}}
      {{/if}}
    </section>`;
  }
}

export default withRouter(withStore(LoginPage));
