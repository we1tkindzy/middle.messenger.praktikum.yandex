export enum ValidateRuleType {
  Login = 'login',
  Password = 'password'
}

type ValidateRule = {
  value: string
  type: ValidateRuleType
}

export function validateForm(rules: ValidateRule[]) {
  let errorMessage = '';

  for(let i = 0; i < rules.length; i++) {
    const { type, value } = rules[i];

    if(type === ValidateRuleType.Login) {
      if(value.length < 3 || value.length > 20) {
        errorMessage = 'Логин должен быть от 3 до 20 символов';
        break;
      } else if (value.match(/^\d+$/)) {
        errorMessage = 'Логин не должен состоять только из цифр';
        break;
      } else if (!(value.match(/^\S*$/))) {
        errorMessage = 'Логин не должен содержать пробелы';
        break;
      } else if (!(value.match(/^[^!@#$%^&*]+$/))) {
        errorMessage = 'Логин не должен содержать спецсимволы, кроме - и _';
        break;
      }
    }

    if(type === ValidateRuleType.Password) {
      if(value.length < 8 || value.length > 40) {
        errorMessage = 'Пароль должен быть от 8 до 40 символов';
        break;
      } else if (!(value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/))) {
        errorMessage = 'Пароль должен содержать хотя бы одну заглавную букву и цифру';
        break;
      }
    }
  }

  return errorMessage;
}
