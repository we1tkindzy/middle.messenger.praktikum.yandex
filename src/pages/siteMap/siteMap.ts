import Block from 'core/Block';

export class SiteMap extends Block {
  render() {
    return `<nav>
      <ul>
        <li>
          <a href="./login">Авторизация</a>
        </li>
        <li>
          <a href="./signin">Регистрация</a>
        </li>
        <li>
          <a href="./500">Ошибка 500</a>
        </li>
        <li>
          <a href="./404">Ошибка 404</a>
        </li>
        <li>
          <a href="./select-chat">Выбрать чат</a>
        </li>
        <li>
          <a href="./active-chat">Активный чат</a>
        </li>
        <li>
          <a href="./user-popup">Добавить/удалить пользователя</a>
        </li>
        <li>
          <a href="./profile">Профиль</a>
        </li>
        <li>
          <a href="./change-profile">Изменить данные</a>
        </li>
        <li>
          <a href="./change-password">Изменить пароль</a>
        </li>
        <li>
          <a href="./file-popup">Изменение аватара</a>
        </li>
      </ul>
    </nav>`
  }
}


