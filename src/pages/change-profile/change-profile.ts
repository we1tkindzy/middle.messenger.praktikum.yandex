import Block from 'core/Block';
import { ValidateRuleType, validateForm } from 'helpers/validateForm';

export class ChangeProfilePage extends Block {
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

        if (inputEl.id === 'display_name') {
          const errorDisplayName = validateForm([
            { type: ValidateRuleType.Name, value: inputEl.value},
          ]);

          this.setProps({
            errorDisplayName,
            displayNameValue: inputEl.value,
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
      },
      emailValue: 'pochta@yandex.ru',
      errorEmail: '',
      loginValue: 'ivanivanov',
      errorLogin: '',
      firstNameValue: 'Иван',
      errorFirstName: '',
      secondNameValue: 'Иванов',
      errorSecondName: '',
      displayNameValue: 'Иван',
      errorDisplayName: '',
      phoneValue: '+79099673030',
      errorPhone: '',
    })
  }

  onSubmit() {
    const emailEl = this.element?.querySelector('input[name="email"]') as HTMLInputElement
    const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
    const firstNameEl = this.element?.querySelector('input[name="first_name"]') as HTMLInputElement
    const secondNameEl = this.element?.querySelector('input[name="second_name"]') as HTMLInputElement
    const displayNameEl = this.element?.querySelector('input[name="display_name"]') as HTMLInputElement
    const phoneEl = this.element?.querySelector('input[name="phone"]') as HTMLInputElement


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


    this.setProps({
      emailValue: emailEl.value,
      errorEmail,
      loginValue: loginEl.value,
      errorLogin,
      firstNameValue: firstNameEl.value,
      errorFirstName,
      secondNameValue: secondNameEl.value,
      errorSecondName,
      displayNameValue: displayNameEl.value,
      errorDisplayName,
      phoneValue: phoneEl.value,
      errorPhone,
    });

    if(!errorEmail && !errorLogin && !errorFirstName && !errorSecondName && !errorDisplayName && !errorPhone) {
      console.log(`Почта - ${emailEl.value}, Логин - ${loginEl.value}, Имя - ${firstNameEl.value}, Фамилия - ${secondNameEl.value}, Имя в чате - ${displayNameEl.value}, Телефон - ${phoneEl.value}`)
    }
  }

  render() {
    return `<section class="profile profile--change">
      <div class="profile__wrapper">
        {{{ BackToPage link="./profile" }}}

        <form class="profile__profile-section" action="POST">
          <div class="profile__avatar">
            <img src="../avatar-icon.svg" alt="Аватар пользоватлея" width="40" height="40">
          </div>

          <div class="profile__info">
            {{{InputField
              type="email"
              placeholder="pochta@yandex.ru"
              name="email"
              label="Почта"
              value=emailValue
              className="profile-field"
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
              className="profile-field"
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
              className="profile-field"
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
              className="profile-field"
              ref="secondNameInput"
              error=errorSecondName
              onBlur=onBlur
            }}}

            {{{InputField
              type="text"
              placeholder="Иван"
              name="display_name"
              label="Имя в чате"
              value=displayNameValue
              className="profile-field"
              ref="displayNameInput"
              error=errorDisplayName
              onBlur=onBlur
            }}}

            {{{InputField
              type="tel"
              placeholder="+79099673030"
              name="phone"
              label="Телефон"
              value=phoneValue
              className="profile-field"
              ref="phoneInput"
              error=errorPhone
              onBlur=onBlur
            }}}
          </div>

          {{{Button text="Сохранить" className="profile__submit" onClick=onSubmit}}}
        </form>
      </div>
    </section>`
  }
}
