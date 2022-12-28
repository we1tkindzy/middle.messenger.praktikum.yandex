import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class ChangePasswordPage extends Block {
  constructor() {
    super()

    this.setProps({
      onSubmit: () => this.onSubmit(),
      onBlur: (evt: Event) => {
        const inputEl = evt.target as HTMLInputElement;

        if (inputEl.id === 'old_password') {
          const errorOldPassword = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value}
          ]);

          this.setProps({
            errorOldPassword,
            oldPasswordValue: inputEl.value,
          });
        }

        if (inputEl.id === 'new_password') {
          const errorNewPassword = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value},
          ]);

          this.setProps({
            errorNewPassword,
            newPasswordValue: inputEl.value,
          });
        }

        if (inputEl.id === 'new_password_check') {
          const errorNewPasswordCheck = validateForm([
            { type: ValidateRuleType.Password, value: inputEl.value},
          ]);

          this.setProps({
            errorNewPasswordCheck,
            newPasswordCheckValue: inputEl.value,
          });
        }
      },
      oldPasswordValue: '',
      errorOldPassword: '',
      newPasswordValue: '',
      errorNewPassword: '',
      newPasswordCheckValue: '',
      errorNewPasswordCheck: '',
    })
  }

  onSubmit() {
    const oldPasswordEl = this.element?.querySelector('input[name="old_password"]') as HTMLInputElement
    const newPasswordEl = this.element?.querySelector('input[name="new_password"]') as HTMLInputElement
    const newPasswordCheckEl = this.element?.querySelector('input[name="new_password_check"]') as HTMLInputElement


    const errorOldPassword = validateForm([
      { type: ValidateRuleType.Password, value: oldPasswordEl.value}
    ]);

    const errorNewPassword = validateForm([
      { type: ValidateRuleType.Password, value: newPasswordEl.value}
    ]);

    let errorNewPasswordCheck = validateForm([
      { type: ValidateRuleType.Password, value: newPasswordCheckEl.value}
    ]);

    if (newPasswordEl.value !== newPasswordCheckEl.value) {
      errorNewPasswordCheck = "Пароли должны совпадать";
    }


    this.setProps({
      oldPasswordValue: oldPasswordEl.value,
      errorOldPassword,
      newPasswordValue: newPasswordEl.value,
      errorNewPassword,
      newPasswordCheckValue: newPasswordCheckEl.value,
      errorNewPasswordCheck,
    });

    if(!errorOldPassword && !errorNewPassword && !errorNewPasswordCheck) {
      console.log(`Старый пароль - ${oldPasswordEl.value}, Новый пароль - ${newPasswordEl.value}, Повтор нового пароля - ${newPasswordCheckEl.value}`)
    }
  }

  render() {
    return `<section class="profile">
      <div class="profile__wrapper">
        {{{ BackToPage link="./profile" }}}

        <form class="profile__profile-section" action="POST">
          <div class="profile__avatar">
            <img src="../avatar-icon.svg" alt="Аватар пользоватлея" width="40" height="40">
          </div>

          <div class="profile__info">
            {{{InputField
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

            {{{InputField
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

            {{{InputField
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
    </section>`
  }
}
