import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class ChangePasswordPage extends Block {
  constructor() {
    super()

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
    })
  }

  onSubmit(evt: SubmitEvent) {
    evt.preventDefault();
    const oldPasswordEl = this.element?.querySelector('input[name="old_password"]') as HTMLInputElement;
    let oldPasswordElError = oldPasswordEl.parentNode?.querySelector('.error');
    const newPasswordEl = this.element?.querySelector('input[name="new_password"]') as HTMLInputElement;
    let ewPasswordElError = newPasswordEl.parentNode?.querySelector('.error');
    const newPasswordCheckEl = this.element?.querySelector('input[name="new_password_check"]') as HTMLInputElement;
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
      newPasswordCheckElError.textContent = "???????????? ???????????? ??????????????????";
    }

    if(!errorOldPassword && !errorNewPassword && !errorNewPasswordCheck) {
      console.log(`???????????? ???????????? - ${oldPasswordEl.value}, ?????????? ???????????? - ${newPasswordEl.value}, ???????????? ???????????? ???????????? - ${newPasswordCheckEl.value}`);
      oldPasswordEl.value = '';
      newPasswordEl.value = '';
      newPasswordCheckEl.value = '';
    }
  }

  render() {
    return `<section class="profile">
      <div class="profile__wrapper">
        {{{ BackToPage link="./profile" }}}

        <form class="profile__profile-section" action="POST">
          <div class="profile__avatar">
            <img src="../avatar-icon.svg" alt="???????????? ????????????????????????" width="40" height="40">
          </div>

          <div class="profile__info">
            {{{InputField
              type="password"
              placeholder="??????????????????"
              name="old_password"
              label="???????????? ????????????"
              value=oldPasswordValue
              className="profile-field"
              ref="oldPasswordInput"
              error=errorOldPassword
              onBlur=onBlur
            }}}

            {{{InputField
              type="password"
              placeholder="??????????????????"
              name="new_password"
              label="?????????? ????????????"
              value=newPasswordValue
              className="profile-field"
              ref="passwordCheckInput"
              error=errorNewPassword
              onBlur=onBlur
            }}}

            {{{InputField
              type="password"
              placeholder="??????????????????"
              name="new_password_check"
              label="?????????????????? ?????????? ????????????"
              value=newPasswordCheckValue
              className="profile-field"
              ref="passwordCheckInput"
              error=errorNewPasswordCheck
              onBlur=onBlur
            }}}
          </div>

          {{{Button text="??????????????????" className="profile__submit" onClick=onSubmit}}}
        </form>
      </div>
    </section>`
  }
}
