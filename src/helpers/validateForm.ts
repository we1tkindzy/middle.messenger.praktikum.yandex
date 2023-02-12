export enum ValidateRuleType {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Name = 'name',
  Phone = 'phone',
  Message = 'message',
}

type ValidateRule = {
  value: string
  type: ValidateRuleType
};

export function validateForm(rules: ValidateRule[]) {
  let errorMessage = '';

  for (let i = 0; i < rules.length; i += 1) {
    const { type, value } = rules[i];

    if (type === ValidateRuleType.Login) {
      if (value.length < 3 || value.length > 20) {
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

    if (type === ValidateRuleType.Password) {
      if (value.length < 8 || value.length > 40) {
        errorMessage = 'Пароль должен быть от 8 до 40 символов';
        break;
      } else if (!(value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/))) {
        errorMessage = 'Пароль должен содержать хотя бы одну заглавную букву и цифру';
        break;
      }
    }

    if (type === ValidateRuleType.Name) {
      if (value.length === 0) {
        errorMessage = 'Поле не должно быть пустым';
        break;
      } else if (value.match(/[^a-zа-яё-]/iu)) {
        errorMessage = 'Поле должно состоять только из латиницы или кириллицы';
        break;
      } else if (value.match(/( |^)[а-яёa-z]/g)) {
        errorMessage = 'Первая буква должна быть заглавной';
        break;
      }
    }

    if (type === ValidateRuleType.Email) {
      if (!(value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
        errorMessage = 'Поле должно состоять из латиницы, цифр, а также @ и .';
        break;
      }
    }

    if (type === ValidateRuleType.Phone) {
      if (!(value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/))) {
        errorMessage = 'Номер должен быть от 10 до 15 символов, состоит из цифр, может начинается с плюса';
        break;
      }
    }

    if (type === ValidateRuleType.Message) {
      if (!value || value.length === 0) {
        errorMessage = 'Сообщение не должно быть пустым';
        break;
      }
    }
  }

  return errorMessage;
}
