import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class ChangeProfilePage extends Block {
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

        if (inputEl.id === 'display_name') {
          const errorDisplayName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value},
          ]);

          if(errorEl) {
            errorEl.textContent = errorDisplayName;
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
    const displayNameEl = this.element?.querySelector('input[name="display_name"]') as HTMLInputElement;
    let displayNameElError = displayNameEl.parentNode?.querySelector('.error');
    const phoneEl = this.element?.querySelector('input[name="phone"]') as HTMLInputElement;
    let phoneElError = phoneEl.parentNode?.querySelector('.error');


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

    let errorDisplayName = validateForm([
      { type: ValidateRuleType.Name, value: displayNameEl.value},
    ]);

    const errorPhone = validateForm([
      { type: ValidateRuleType.Phone, value: phoneEl.value}
    ]);

    emailEl.value = emailEl.value;
    loginEl.value = loginEl.value;
    firstNameEl.value = firstNameEl.value;
    secondNameEl.value = secondNameEl.value;
    displayNameEl.value = displayNameEl.value;
    phoneEl.value = phoneEl.value;

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

    if(displayNameElError) {
      displayNameElError.textContent = errorDisplayName;
    }

    if(phoneElError) {
      phoneElError.textContent = errorPhone;
    }

    if(!errorEmail && !errorLogin && !errorFirstName && !errorSecondName && !errorDisplayName && !errorPhone) {
      console.log(`Почта - ${emailEl.value}, Логин - ${loginEl.value}, Имя - ${firstNameEl.value}, Фамилия - ${secondNameEl.value}, Имя в чате - ${displayNameEl.value}, Телефон - ${phoneEl.value}`);
      emailEl.value = '';
      loginEl.value = '';
      firstNameEl.value = '';
      secondNameEl.value = '';
      displayNameEl.value = '';
      phoneEl.value = '';
    }
  }

  render() {
    return `<section class="profile profile--change">
      <div class="profile__wrapper">
        {{{ BackToPage link="./profile" }}}

        <form class="profile__profile-section">
          <div class="profile__avatar">
            <img src="../avatar-icon.svg" alt="Аватар пользоватлея" width="40" height="40">
          </div>

          <div class="profile__info">
            {{{InputField
              type="email"
              placeholder="pochta@yandex.ru"
              name="email"
              label="Почта"
              className="profile-field"
              onBlur=onBlur
            }}}

            {{{InputField
              type="text"
              placeholder="ivanivanov"
              name="login"
              label="Логин"
              className="profile-field"
              onBlur=onBlur
            }}}

            {{{InputField
              type="text"
              placeholder="Иван"
              name="first_name"
              label="Имя"
              className="profile-field"
              onBlur=onBlur
            }}}

            {{{InputField
              type="text"
              placeholder="Иванов"
              name="second_name"
              label="Фамилия"
              className="profile-field"
              onBlur=onBlur
            }}}

            {{{InputField
              type="text"
              placeholder="Иван"
              name="display_name"
              label="Имя в чате"
              className="profile-field"
              onBlur=onBlur
            }}}

            {{{InputField
              type="tel"
              placeholder="+79099673030"
              name="phone"
              label="Телефон"
              className="profile-field"
              onBlur=onBlur
            }}}
          </div>

          {{{Button text="Сохранить" className="profile__submit" onClick=onSubmit}}}
        </form>
      </div>
    </section>`
  }
}
