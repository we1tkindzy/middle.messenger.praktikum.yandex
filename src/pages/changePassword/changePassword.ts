import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';
import withUser from 'utils/withUser';
import { changePassword } from 'service/user';
import { queryHtmlInput } from 'helpers/queryHTMLInput';

interface ChangePasswordPageProps {
  onClick?: () => void;
  onNavigate?: () => void;
}

class ChangePasswordPage extends Block {
  constructor(props: ChangePasswordPageProps) {
    super({...props});

    this.setProps({
      onSubmit: (evt: SubmitEvent) => this.onSubmit(evt),
      onBlur: (evt: Event) => {
        const inputEl = evt.target as HTMLInputElement;
        let errorEl = inputEl.parentNode?.querySelector('.error');

        if (inputEl.id === 'old_password') {
          const errorOldPassword = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value}
          ]);

          if(errorEl) {
            errorEl.textContent = errorOldPassword;
          }
        }

        if (inputEl.id === 'new_password') {
          const errorNewPassword = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value},
          ]);

          if(errorEl) {
            errorEl.textContent = errorNewPassword;
          }
        }

        if (inputEl.id === 'new_password_check') {
          const errorNewPasswordCheck = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value},
          ]);

          if(errorEl) {
            errorEl.textContent = errorNewPasswordCheck;
          }
        }
      },
      navigateToProfile: () => this.props.router.go('/profile'),
    })
  }

  onSubmit(evt: SubmitEvent) {
    evt.preventDefault();
    const oldPasswordEl = queryHtmlInput(this.element, 'input[name="old_password"]');
    let oldPasswordElError = oldPasswordEl.parentNode?.querySelector('.error');
    const newPasswordEl = queryHtmlInput(this.element, 'input[name="new_password"]');
    let ewPasswordElError = newPasswordEl.parentNode?.querySelector('.error');
    const newPasswordCheckEl = queryHtmlInput(this.element, 'input[name="new_password_check"]');
    let newPasswordCheckElError = newPasswordCheckEl.parentNode?.querySelector('.error');


    const errorOldPassword = validateForm([
      { type: ValidateRuleType.Password, value: oldPasswordEl.value}
    ]);

    const errorNewPassword = validateForm([
      { type: ValidateRuleType.Password, value: newPasswordEl.value}
    ]);

    let errorNewPasswordCheck = validateForm([
      { type: ValidateRuleType.Password, value: newPasswordCheckEl.value}
    ]);

    oldPasswordEl.value = oldPasswordEl.value;
    newPasswordEl.value = newPasswordEl.value;
    newPasswordCheckEl.value = newPasswordCheckEl.value;

    if(oldPasswordElError) {
      oldPasswordElError.textContent = errorOldPassword;
    }

    if(ewPasswordElError) {
      ewPasswordElError.textContent = errorNewPassword;
    }

    if(newPasswordCheckElError) {
      newPasswordCheckElError.textContent = errorNewPasswordCheck;
    }

    if (newPasswordCheckElError && newPasswordEl.value !== newPasswordCheckEl.value) {
      newPasswordCheckElError.textContent = 'Пароли должны совпадать';
    }

    if(!errorOldPassword && !errorNewPassword && !errorNewPasswordCheck) {
      console.log(`Старый пароль - ${oldPasswordEl.value}, Новый пароль - ${newPasswordEl.value}, Повтор нового пароля - ${newPasswordCheckEl.value}`);
      const passwordData = {
        oldPassword: oldPasswordEl.value,
        newPassword: newPasswordEl.value
      };
      this.props.store.dispatch(changePassword, passwordData);
      oldPasswordEl.value = '';
      newPasswordEl.value = '';
      newPasswordCheckEl.value = '';
    }
  }

  render() {
    if (!this.props.user) {
      return `{{{ Loader }}}`;
    }

    return `<section class="profile">
      <div class="profile__wrapper">
        {{{ BackToPage
          onNavigate=navigateToProfile
        }}}

        <form class="profile__profile-section" action="POST">
          {{{ Avatar
            url="${this.props.user.avatar}"
          }}}

          <div class="profile__info">
            {{{ InputField
              type="password"
              placeholder="••••••"
              name="old_password"
              label="Старый пароль"
              value=oldPasswordValue
              className="profile-field"
              ref="oldPasswordInput"
              error=errorOldPassword
              onBlur=onBlur
            }}}

            {{{ InputField
              type="password"
              placeholder="••••••"
              name="new_password"
              label="Новый пароль"
              value=newPasswordValue
              className="profile-field"
              ref="passwordCheckInput"
              error=errorNewPassword
              onBlur=onBlur
            }}}

            {{{ InputField
              type="password"
              placeholder="••••••"
              name="new_password_check"
              label="Повторите новый пароль"
              value=newPasswordCheckValue
              className="profile-field"
              ref="passwordCheckInput"
              error=errorNewPasswordCheck
              onBlur=onBlur
            }}}
          </div>

          {{{Button text="Сохранить" className="profile__submit" onClick=onSubmit}}}
        </form>
      </div>

      {{#if ${!!window.store.getState().isLoading} }}
        {{{ Loader }}}
      {{/if}}
    </section>`
  }
}

export default withRouter(withStore(withUser(ChangePasswordPage)));
